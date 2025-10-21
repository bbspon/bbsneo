import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Table,
  Form,
  InputGroup,
  Dropdown,
  Modal,
  Spinner,
  Breadcrumb,
} from "react-bootstrap";
import { FaBars, FaSearch, FaCog, FaTrash, FaPen, FaPlus, FaFilter } from "react-icons/fa";

// Mock hierarchical data generator
function generateMockData() {
  const now = Date.now();
  const campaigns = Array.from({ length: 5 }, (_, i) => ({
    id: `campaign-${i + 1}`,
    name: `Campaign ${i + 1}`,
    status: i % 2 === 0 ? "Active" : "Paused",
    startDate: new Date(now - i * 86400000).toISOString().split("T")[0],
    endDate: new Date(now + (i + 5) * 86400000).toISOString().split("T")[0],
  }));

  const adSets = [];
  const ads = [];

  campaigns.forEach((c, ci) => {
    for (let j = 1; j <= 3; j++) {
      const adsetId = `adset-${ci + 1}-${j}`;
      adSets.push({
        id: adsetId,
        parentId: c.id,
        name: `Ad Set ${ci + 1}-${j}`,
        status: j % 2 === 0 ? "Active" : "Paused",
        budget: (100 + j * 50).toFixed(2),
        startDate: c.startDate,
        endDate: c.endDate,
      });

      for (let k = 1; k <= 3; k++) {
        ads.push({
          id: `ad-${ci + 1}-${j}-${k}`,
          parentId: adsetId,
          name: `Ad ${ci + 1}-${j}-${k}`,
          status: k % 2 === 0 ? "Active" : "Paused",
          budget: (20 + k * 10).toFixed(2),
          startDate: c.startDate,
          endDate: c.endDate,
          impressions: Math.floor(Math.random() * 10000),
          clicks: Math.floor(Math.random() * 500),
          costPerClick: (Math.random() * 5).toFixed(2),
        });
      }
    }
  });

  return { campaigns, adSets, ads };
}

export default function AdsManagerPage() {
  const { campaigns: initialCampaigns, adSets: initialAdSets, ads: initialAds } = useMemo(
    () => generateMockData(),
    []
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [level, setLevel] = useState("campaigns"); // campaigns, adsets, ads
  const [parentId, setParentId] = useState(null); // for adsets/ads

  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [adSets, setAdSets] = useState(initialAdSets);
  const [ads, setAds] = useState(initialAds);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Compute items to display based on level & parentId
  const data = useMemo(() => {
    let arr = [];
    if (level === "campaigns") arr = campaigns;
    else if (level === "adsets") arr = adSets.filter((a) => a.parentId === parentId);
    else if (level === "ads") arr = ads.filter((a) => a.parentId === parentId);

    if (filterStatus !== "All") arr = arr.filter((a) => a.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter((a) => a.name.toLowerCase().includes(q));
    }
    return arr;
  }, [level, parentId, campaigns, adSets, ads, search, filterStatus]);

  // Hierarchy breadcrumbs
  const breadcrumbItems = useMemo(() => {
    const items = [{ label: "Campaigns", level: "campaigns", parentId: null }];
    if (level === "adsets" || level === "ads") {
      const campaign = campaigns.find((c) => c.id === parentId || adSets.find((a) => a.id === parentId)?.parentId === c.id);
      if (campaign) items.push({ label: campaign.name, level: "adsets", parentId: campaign.id });
    }
    if (level === "ads") {
      const adset = adSets.find((a) => a.id === parentId);
      if (adset) items.push({ label: adset.name, level: "ads", parentId: adset.id });
    }
    return items;
  }, [level, parentId, campaigns, adSets]);

  const openEditModal = (row) => {
    setSelectedRow(row);
    setShowEditModal(true);
  };

  const saveEdit = (edited) => {
    if (level === "campaigns") {
      setCampaigns((prev) =>
        prev.some((c) => c.id === edited.id)
          ? prev.map((c) => (c.id === edited.id ? { ...c, ...edited } : c))
          : [...prev, edited]
      );
    } else if (level === "adsets") {
      setAdSets((prev) =>
        prev.some((a) => a.id === edited.id)
          ? prev.map((a) => (a.id === edited.id ? { ...a, ...edited } : a))
          : [...prev, edited]
      );
    } else if (level === "ads") {
      setAds((prev) =>
        prev.some((a) => a.id === edited.id)
          ? prev.map((a) => (a.id === edited.id ? { ...a, ...edited } : a))
          : [...prev, edited]
      );
    }
    setShowEditModal(false);
  };

  const deleteRow = (id) => {
    if (level === "campaigns") {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      setAdSets((prev) => prev.filter((a) => a.parentId !== id));
      setAds((prev) => prev.filter((a) => !adSets.some((adset) => adset.parentId === id && a.parentId === adset.id)));
    } else if (level === "adsets") {
      setAdSets((prev) => prev.filter((a) => a.id !== id));
      setAds((prev) => prev.filter((a) => a.parentId !== id));
    } else if (level === "ads") {
      setAds((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const selectRow = (row) => {
    if (level === "campaigns") {
      setParentId(row.id);
      setLevel("adsets");
    } else if (level === "adsets") {
      setParentId(row.id);
      setLevel("ads");
    }
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0">
      {/* Top Bar */}
      <Row className="bg-light border-bottom align-items-center p-2 sticky-top" style={{ zIndex: 10 }}>
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </Button>
        </Col>
        <Col>
          <h5 className="mb-0">Ads Manager</h5>
        </Col>
        <Col xs="auto">
          <InputGroup size="sm">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <FaFilter /> {filterStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["All", "Active", "Paused"].map((st) => (
                <Dropdown.Item
                  key={st}
                  active={filterStatus === st}
                  onClick={() => setFilterStatus(st)}
                >
                  {st}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              openEditModal({ id: `new-${Date.now()}`, parentId, status: "Active" })
            }
          >
            <FaPlus /> Create
          </Button>
        </Col>
        <Col xs="auto">
          <FaCog size={18} className="text-secondary" />
        </Col>
      </Row>

      <Row className="flex-grow-1 m-0" style={{ overflowY: "auto", flex: "1 1 auto" }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <Col xs={12} md={2} lg={2} className="border-end bg-white p-3">
            <div className="fw-bold mb-3">Levels</div>
            <div className="d-flex flex-column gap-2">
              {["campaigns", "adsets", "ads"].map((lv) => (
                <Button
                  key={lv}
                  variant={level === lv ? "primary" : "outline-primary"}
                  size="sm"
                  onClick={() => {
                    if (lv === "campaigns") setParentId(null);
                    else if (lv === "adsets") setParentId(parentId || campaigns[0]?.id || null);
                    else if (lv === "ads") setParentId(parentId || adSets[0]?.id || null);
                    setLevel(lv);
                  }}
                >
                  {lv.charAt(0).toUpperCase() + lv.slice(1)}
                </Button>
              ))}
            </div>
          </Col>
        )}

        {/* Main content */}
        <Col xs={12} md={sidebarOpen ? 10 : 12} lg={sidebarOpen ? 10 : 12} className="p-3">
          {/* Breadcrumb */}
          <Breadcrumb>
            {breadcrumbItems.map((b, i) => (
              <Breadcrumb.Item
                key={i}
                onClick={() => {
                  setLevel(b.level);
                  setParentId(b.parentId);
                }}
                active={i === breadcrumbItems.length - 1}
                style={{ cursor: "pointer" }}
              >
                {b.label}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>

          <Card className="shadow-sm">
            <Card.Body>
              {loading ? (
                <div className="d-flex justify-content-center py-5">
                  <Spinner animation="border" />
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <Table striped hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Status</th>
                        {level !== "campaigns" && <th>Budget</th>}
                        <th>Start</th>
                        <th>End</th>
                        {level === "ads" && (
                          <>
                            <th>Impressions</th>
                            <th>Clicks</th>
                            <th>CPC</th>
                          </>
                        )}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => (
                        <tr key={row.id} onDoubleClick={() => selectRow(row)} style={{ cursor: "pointer" }}>
                          <td>{row.name}</td>
                          <td>
                            <Button
                              size="sm"
                              variant={row.status === "Active" ? "success" : "secondary"}
                              onClick={(e) => {
                                e.stopPropagation();
                                const updated = { ...row, status: row.status === "Active" ? "Paused" : "Active" };
                                saveEdit(updated);
                              }}
                            >
                              {row.status}
                            </Button>
                          </td>
                          {level !== "campaigns" && <td>{row.budget}</td>}
                          <td>{row.startDate}</td>
                          <td>{row.endDate}</td>
                          {level === "ads" && (
                            <>
                              <td>{row.impressions}</td>
                              <td>{row.clicks}</td>
                              <td>{row.costPerClick}</td>
                            </>
                          )}
                          <td>
                            <Button size="sm" variant="outline-primary" onClick={(e) => { e.stopPropagation(); openEditModal(row); }}>
                              <FaPen />
                            </Button>{" "}
                            <Button size="sm" variant="outline-danger" onClick={(e) => { e.stopPropagation(); deleteRow(row.id); }}>
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {data.length === 0 && (
                        <tr>
                          <td colSpan={level === "ads" ? 9 : 6} className="text-center text-muted">
                            No items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit/Create Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRow?.id?.startsWith("new") ? "Create" : "Edit"} {level.slice(0, -1)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const edited = {
                ...selectedRow,
                name: form.name.value,
                status: form.status.value,
                budget: form.budget?.value || selectedRow.budget || 0,
                startDate: form.start.value,
                endDate: form.end.value,
                impressions: selectedRow.impressions || 0,
                clicks: selectedRow.clicks || 0,
                costPerClick: selectedRow.costPerClick || 0,
              };
              saveEdit(edited);
            }}
          >
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" defaultValue={selectedRow?.name || ""} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" defaultValue={selectedRow?.status || "Active"}>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </Form.Select>
            </Form.Group>
            {level !== "campaigns" && (
              <Form.Group className="mb-2">
                <Form.Label>Budget</Form.Label>
                <Form.Control type="number" name="budget" defaultValue={selectedRow?.budget || 0} />
              </Form.Group>
            )}
            <Form.Group className="mb-2">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="start" defaultValue={selectedRow?.startDate} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="end" defaultValue={selectedRow?.endDate} />
            </Form.Group>
            <div className="mt-3 text-end">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>{" "}
              <Button variant="primary" type="submit">Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
