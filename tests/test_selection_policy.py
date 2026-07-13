from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_selection_capacity_policy_declared():
    text = (ROOT / "Backend" / "stu_choose_.py").read_text(encoding="utf-8")
    assert "MAX_PENDING_SELECTIONS_PER_RECORD = 3" in text
    assert "select_count" in text


def test_rating_validation_exists():
    text = (ROOT / "Backend" / "stu_eval_.py").read_text(encoding="utf-8")
    assert "normalize_score" in text
    assert "1 到 5" in text
