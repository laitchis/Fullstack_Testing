from flask import Flask, request
from flask_cors import CORS, cross_origin
from google.cloud.sql.connector import Connector
import pymysql
import sqlalchemy

connector = Connector()
app = Flask(__name__)
CORS(app)
def getconn() -> pymysql.connections.Connection:
    conn: pymysql.connections.Connection = connector.connect(
       "robotic-goal-449405-j7:us-west1:test-database",
        "pymysql",
        user="root",
        password="Wul2bkitc?",
        db="test-entry"
    )
    return conn

# create connection pool
pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

@app.route("/hello", methods = ["GET", "POST"])
@cross_origin()
def hello():
    if request.method == "POST":
        return {"message": "Posting..."}
    elif request.method == "GET":
        return {"message": "Hello, World!"}
    else:
        return {"message": "No method given"}

@app.route("/create", methods = ["POST"])
@cross_origin()
def create():
    with pool.connect() as db_conn:
        db_conn.execute(sqlalchemy.text("CREATE TABLE test_table (id INT, name VARCHAR(255))"))
    return {"message": "Table created"}

@app.route("/insert", methods = ["POST"])
@cross_origin()
def insert():
    with pool.connect() as db_conn:
        db_conn.execute(sqlalchemy.text("INSERT INTO test_table (id, name) VALUES (1, 'John')"))
        db_conn.commit()
    return {"message": "Data inserted"}

@app.route("/select", methods = ["GET"])
@cross_origin()
def select():
    dataList = []
    with pool.connect() as db_conn:
        with db_conn.execute(sqlalchemy.text("SELECT * FROM test_table")) as result:
            for id, name in result.fetchall():
                print("id: ", id, "name: ", name)
                dataList.append({"id": id, "name": name})
    return {"data": dataList}

@app.route("/delete", methods = ["POST"])
@cross_origin()
def delete():
    with pool.connect() as db_conn:
        db_conn.execute(sqlalchemy.text("DELETE FROM test_table"))
        db_conn.commit()
    return {"message": "Data deleted"}

if __name__ == "__main__":
    app.run(debug = True)