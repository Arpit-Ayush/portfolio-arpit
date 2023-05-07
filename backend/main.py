import os
from flask import Flask, g, request, render_template, make_response
from flask_cors import CORS
from flask_mail import Mail, Message
from markupsafe import escape
from dotenv import load_dotenv
import pymysql
import logging
import datetime

application = Flask(__name__)
CORS(application)

load_dotenv('/home/arpit/portfolio_backend/.env') #loading environment variables

@application.before_request
def before_request():
  print("Establishing connection to the database...")
  g.db = pymysql.connect(host="localhost", user=os.environ["DB_USER"], password=os.environ["DB_PASSWORD"], db="portfolio", autocommit=True)
  g.cursor = g.db.cursor()


@application.teardown_request
def teardown_request(exception):
  print("Closing the connection to the database...")
  g.cursor.close()
  g.db.close()

@application.route("/<name>")
def hello(name):
    return f('Hello, {escape(name)}!')

@application.route("/api/recommendations", methods=["GET"])
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

    response = make_response({"isSuccessful": True, "results": results})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}


@application.route("/api/skills", methods=["GET"])
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

    response = make_response({"isSuccessful": True, "results": results})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}


@application.route("/api/projects", methods=["GET"])
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

    response = make_response({"isSuccessful": True, "results": results})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}


@application.route("/api/certificates/all", methods=["GET"])
def get_all_certificates():
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

    response = make_response({"isSuccessful": True, "results": results})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}

@application.route("/api/certificates/additional", methods=["GET"])
def get_additional_certificates():
  try:
    query="SELECT id, imageUrl, title FROM certificates WHERE isPublished=True AND type='Additional Course';"
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

    response = make_response({"isSuccessful": True, "results": results})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}

@application.route("/api/certificates/curricular", methods=["GET"])
def get_curricular_certificates():
  try:
    query="SELECT id, imageUrl, title FROM certificates WHERE isPublished=True AND type='Co&Extra Curricular';"
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

    response = make_response({"isSuccessful": True, "results": results})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "results": []}

@application.route("/api/project", methods=["GET"])
def get_project_by_id():
  try:
    id= request.args.get("id")

    query = "SELECT imageUrl, title, body from projects WHERE id=%s;"
    g.cursor.execute(query,[id])

    project = g.cursor.fetchone()

    project_obj = {"imageUrl": project[0], "title": project[1], "body": project[2]}

    response = make_response({"isSuccessful": True, "result": project_obj})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "result": {}}


@application.route("/api/certificate", methods=["GET"])
def get_certificate_by_id():
  try:
    id= request.args.get("id")

    query = "SELECT imageUrl, title from certificates WHERE id=%s;"
    g.cursor.execute(query,[id])

    certificate = g.cursor.fetchone()

    certificate_obj = {"imageUrl": certificate[0], "title": certificate[1]}

    response = make_response({"isSuccessful": True, "result": certificate_obj})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful": False, "result": {}}


@application.route("/api/recommendation/add", methods=["POST"])
def add_recommendation():
  try:
    recommendation = request.json
    #print(recommendation)
    query = "Insert into recommendations values(%s, %s, %s, %s, %s, %s, %s);"
    g.cursor.execute(query, [recommendation["id"], recommendation["name"], recommendation["email"], recommendation["company"], recommendation["designation"], recommendation["recommendationMessage"], False])

    response = make_response ({"isSuccessful":True})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful":False}


@application.route("/api/project/add", methods=["POST"])
def add_project():
  try:
    project = request.json
    #print(project)
    query = "Insert into projects values(%s, %s, %s, %s, %s, %s, %s);"
    g.cursor.execute(query, [project["id"], project["imageUrl"], project["title"], project["excerpt"], project["body"], True, datetime.datetime.now()])

    response = make_response({"isSuccessful":True})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful":False}


@application.route("/api/certificate/add", methods=["POST"])
def add_certificate():
  try:
    certificate = request.json
    #print(blog)
    query = "Insert into certificates values(%s, %s, %s, %s, %s, %s);"
    g.cursor.execute(query, [certificate["id"], certificate["imageUrl"], certificate["title"], certificate["type"], True, datetime.datetime.now()])

    response = make_response({"isSuccessful":True})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful":False}


@application.route("/api/contact/send", methods=["POST"])
def send_contact_details():
  try:
    contact_form = request.json
    contacts_name = contact_form['name']
    contacts_email = contact_form['email']

    email_sender = os.environ['HOSTINGER_MAIL_USER']
    email_receiver = 'arpitportfolio01@gmail.com'

    application.config['MAIL_SERVER']='smtp.hostinger.com'
    application.config['MAIL_PORT'] = 465
    application.config['MAIL_USERNAME'] = os.environ['HOSTINGER_MAIL_USER']
    application.config['MAIL_PASSWORD'] = os.environ['HOSTINGER_MAIL_PASSWORD']
    application.config['MAIL_USE_TLS'] = False
    application.config['MAIL_USE_SSL'] = True

    mail = Mail(application)

    mail.send_message("Someone contacted you through your portfolio website!", sender = email_sender, recipients=[email_receiver], body=("Contact Details: %s at %s\n\nMessage:-\n\n"%(contacts_name, contacts_email)) + contact_form["message"])

    response = make_response({"isSuccessful":True})
    return response

  except Exception as e:
    logging.error(e)
    return {"isSuccessful":False}


if __name__ != "__main__" :
  uwsgi_logger = logging.getLogger("uwsgi error")
  application.logger.handlers = uwsgi_logger.handlers
  application.logger.setLevel(uwsgi_logger.level)
  