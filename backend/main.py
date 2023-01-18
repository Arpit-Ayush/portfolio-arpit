from flask import Flask, g, request
from flask_cors import CORS
import pymysql
import logging
import datetime

app = Flask(__name__)
CORS(app)

@app.before_request
def before_request():
  print("Establishing connection to the database...")
  g.db = pymysql.connect(host="localhost", user="root", password="Arpit_7991", db="portfolio_website", autocommit=True)
  g.cursor = g.db.cursor()


@app.teardown_request
def teardown_request(exception):
  print("Closing the connection to the database...")
  g.cursor.close()
  g.db.close()


@app.route("/api/recommendations", methods=["GET"])
def get_recommendation():
  try:
    query="SELECT * FROM recommendations WHERE onShowcase=True;"
    g.cursor.execute(query)

    recommendations = g.cursor.fetchall()
    results = []
    for recommendation in recommendations:
      recommendation_obj = {
        "id" : recommendation[0],
        "name" : recommendation[1],
        "company" : recommendation[3],
        "designation" : recommendation[4],
        "message" : recommendation[5],
      }
      results.append(recommendation_obj)
    
    return {"isSuccessful": True, "results": results}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}


@app.route("/api/skills", methods=["GET"])
def get_skills():
  try:
    query="SELECT * FROM skills;"
    g.cursor.execute(query)

    skills = g.cursor.fetchall()
    results = []
    for skill in skills:
      skill_obj = {
        "id" : skill[0],
        "imageUrl" : skill[1],
        "name" : skill[2],
        "starsTotal" : skill[3],
        "starsActive" : skill[4],
      }
      results.append(skill_obj)
    
    return {"isSuccessful": True, "results": results}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}


@app.route("/api/projects", methods=["GET"])
def get_projects():
  try:
    query="SELECT id, imageUrl, title, excerpt FROM projects WHERE isPublished=True ORDER BY lastModified DESC;"
    g.cursor.execute(query)

    projects = g.cursor.fetchall()
    results = []
    for project in projects:
      project_obj = {
        "id": project[0],
        "imageUrl": project[1],
        "title": project[2],
        "excerpt": project[3],
      }
      results.append(project_obj)
    
    return {"isSuccessful": True, "results": results}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}


@app.route("/api/certificates", methods=["GET"])
def get_certificates():
  try:
    query="SELECT id, imageUrl, title FROM certificates WHERE isPublished=True ORDER BY lastModified DESC;"
    g.cursor.execute(query)

    certificates = g.cursor.fetchall()
    results = []
    for certificate in certificates:
      certificate_obj = {
        "id" : certificate[0],
        "imageUrl": certificate[1],
        "title": certificate[2],
      }
      results.append(certificate_obj)
    
    return {"isSuccessful": True, "results": results}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}


@app.route("/api/project", methods=["GET"])
def get_project_by_id():
  try:
    id= request.args.get("id")

    query = "SELECT imageUrl, title, body from projects WHERE id=%s;"
    g.cursor.execute(query,[id])

    project = g.cursor.fetchone()

    project_obj = {"imageUrl": project[0], "title": project[1], "body": project[2]}

    return {"isSuccessful": True, "result": project_obj}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "result": {}}


@app.route("/api/certificate", methods=["GET"])
def get_certificate_by_id():
  try:
    id= request.args.get("id")

    query = "SELECT imageUrl, title from certificates WHERE id=%s;"
    g.cursor.execute(query,[id])

    certificate = g.cursor.fetchone()

    certificate_obj = {"imageUrl": certificate[0], "title": certificate[1]}

    return {"isSuccessful": True, "result": certificate_obj}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "result": {}}


@app.route("/api/recommendation/add", methods=["POST"])
def add_recommendation():
  try:
    recommendation = request.json
    #print(recommendation)
    query = "Insert into recommendations values(%s, %s, %s, %s, %s, %s, %s);"
    g.cursor.execute(query, [recommendation["id"], recommendation["name"], recommendation["email"], recommendation["company"], recommendation["designation"], recommendation["message"], False])
    
    return {"isSuccessful":True}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful":False}

@app.route("/api/project/add", methods=["POST"])
def add_project():
  try:
    project = request.json
    #print(project)
    query = "Insert into projects values(%s, %s, %s, %s, %s, %s, %s);"
    g.cursor.execute(query, [project["id"], project["imageUrl"], project["title"], project["excerpt"], project["body"], True, datetime.datetime.now()])
    
    return {"isSuccessful":True}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful":False}

@app.route("/api/certificate/add", methods=["POST"])
def add_certificate():
  try:
    certificate = request.json
    #print(blog)
    query = "Insert into certificates values(%s, %s, %s, %s, %s);"
    g.cursor.execute(query, [certificate["id"], certificate["imageUrl"], certificate["title"], False, datetime.datetime.now()])
    
    return {"isSuccessful":True}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful":False}

@app.route("/api/contact/send", methods=["POST"])
def send_contact():
  try:
    certificate = request.json
    #print(blog)
    query = "Insert into certificates values(%s, %s, %s, %s, %s);"
    g.cursor.execute(query, [certificate["id"], certificate["imageUrl"], certificate["title"], True, datetime.datetime.now()])
    
    return {"isSuccessful":True}
  except Exception as e:
    logging.error(e)
    return {"isSuccessful":False}


if __name__ != "__main__" :
  waitress_logger = logging.getLogger("waitress error")
  app.logger.handlers = waitress_logger.handlers
  app.logger.setLevel(waitress_logger.level)