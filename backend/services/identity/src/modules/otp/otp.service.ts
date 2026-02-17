import { Injectable, BadRequestException } from '@nestjs/common';

interface BsnlConfig {
  baseUrl: string;
  username: string;
  password: string;
  serviceId: string;
  senderId: string;
  templateId: string;
  entityId: string;
  jwtToken: string | null;
  ipAddresses: string[];
  mockMode: boolean;
}

@Injectable()
export class OtpService {
  private store = new Map<string, string>();

  private config: BsnlConfig = {
    baseUrl: process.env.BSNL_BASE_URL || 'https://bulksms.bsnl.in:5010',
    username: process.env.BSNL_USERNAME || 'bbspon',
    password: process.env.BSNL_PASSWORD || '1947@PEAcock',
    serviceId: process.env.BSNL_SERVICE_ID || '10894',
    senderId: process.env.BSNL_SENDER_ID || 'GLXINF',
    templateId: process.env.BSNL_TEMPLATE_ID || '1407172612209917457',
    entityId: process.env.BSNL_ENTITY_ID || '1401534940000071127',
    jwtToken: null,
    ipAddresses: [],
    mockMode: process.env.BSNL_MOCK_MODE === 'true',
  };

  // ✅ Correct Token API
private async ensureToken(): Promise<string> {
  if (this.config.mockMode) return 'mock-token';
  if (this.config.jwtToken) return this.config.jwtToken;

  const resp = await fetch(
    `${this.config.baseUrl}/api/Create_New_API_Token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Service_Id: this.config.serviceId,
        Username: this.config.username,
        Password: this.config.password,
        Token_Id: '1',
        IP_Addresses: null,
      }),
    },
  );

  const rawText = await resp.text();   // 👈 IMPORTANT
  console.log('🔎 BSNL TOKEN RAW RESPONSE:', rawText);

  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch {
    data = rawText; // sometimes BSNL returns plain string
  }

  if (!resp.ok) {
    throw new Error(`BSNL token failed: ${rawText}`);
  }

  // ✅ Try all possible formats
  const token =
    data?.token ||
    data?.Token ||
    data?.jwtToken ||
    (typeof data === 'string' ? data : null);

  if (!token || typeof token !== 'string') {
    throw new Error(`Invalid JWT token received from BSNL: ${rawText}`);
  }

  this.config.jwtToken = token;
  return token;
}


  private async sendBsnlSms(phone: string, otp: string) {
    if (this.config.mockMode) {
      console.log('[BSNL MOCK SMS]', phone, otp);
      return;
    }

    const token = await this.ensureToken();

    const normalizedPhone = phone.replace(/\D/g, '').slice(-10);

    const payload = {
      Header: this.config.senderId,
      Target: normalizedPhone,
      Is_Unicode: '0',
      Is_Flash: '0',
      Message_Type: 'SI',
      Entity_Id: this.config.entityId,
      Content_Template_Id: this.config.templateId,
      Consent_Template_Id: null,
      Template_Keys_and_Values: [
        {
          Key: 'var',
          Value: otp,
        },
      ],
    };

    const res = await fetch(
      `${this.config.baseUrl}/api/Send_SMS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const data: any = await res.json().catch(() => ({}));

    if (!res.ok || data?.Error) {
      throw new Error(
        `BSNL SMS failed: ${JSON.stringify(data)}`,
      );
    }
  }

  async sendOtp(phone: string) {
    if (!/^[0-9]{10}$/.test(phone)) {
      throw new BadRequestException('phone must be 10 digits');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    this.store.set(phone, code);

    await this.sendBsnlSms(phone, code);

    return { ok: true };
  }

  verifyOtp(phone: string, otp: string) {
    const stored = this.store.get(phone);

    if (stored && stored === otp) {
      this.store.delete(phone);
      return true;
    }

    return false;
  }
}
