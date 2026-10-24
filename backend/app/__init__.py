from datetime import datetime, timezone
from fastapi import FastAPI

app = FastAPI(title="oeuvre-dart")


def current_artwork():
    now = datetime.now(timezone.utc)
    seed = int(now.timestamp()) // 60
    return {
        "id": seed,
        "seed": seed,
        "generated_at": now.isoformat(),
        "palette": ["#1a1a2e", "#16213e", "#0f3460", "#e94560"],
        "params": {"minute": now.minute},
        "image_url": f"/api/artwork/{seed}/image.png",
    }


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/artwork/current")
def artwork_current():
    return current_artwork()
