from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from database import Base

class ECIFaq(Base):
    __tablename__ = "eci_faqs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(50))
    language = Column(String(5), default="en")
    source = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)

class MisinfoKB(Base):
    __tablename__ = "misinfo_kb"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    claim = Column(Text, nullable=False)
    verdict = Column(String(20), nullable=False) # REAL, FAKE, MISLEADING, UNVERIFIED
    explanation = Column(Text, nullable=False)
    source = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)

class Constituency(Base):
    __tablename__ = "constituencies"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    seat_type = Column(String(20)) # General, SC, ST
    pincode_ranges = Column(JSON) # [{"from": 110001, "to": 110010}]
    mp_name = Column(String(100))
    phase = Column(Integer)

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question = Column(Text, nullable=False)
    option_a = Column(String(200))
    option_b = Column(String(200))
    option_c = Column(String(200))
    option_d = Column(String(200))
    correct_option = Column(String(1), nullable=False) # A, B, C, D
    explanation = Column(Text)
    topic = Column(String(50))
