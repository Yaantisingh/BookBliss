from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from fastapi import FastAPI

dburl="mysql://root:54321@127.0.0.1:3306/book_db"
engine=create_engine(dburl)
Base=declarative_base()
SessionLocal=sessionmaker(autocommit=False,bind=engine)