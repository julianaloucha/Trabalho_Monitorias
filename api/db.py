# api/db.py
from pymongo import MongoClient

def get_db_collections(mongo_uri):
    client = MongoClient(mongo_uri)
    db = client['monitoriasfacamp']
    monitorias_collection = db['monitorias']
    users_collection = db['users']
    return monitorias_collection, users_collection
