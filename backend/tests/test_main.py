from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_artwork_current():
    r = client.get("/api/artwork/current")
    assert r.status_code == 200
    data = r.json()
    assert "id" in data
    assert "seed" in data
    assert "generated_at" in data
    assert "palette" in data
    assert "params" in data
    assert "image_url" in data
