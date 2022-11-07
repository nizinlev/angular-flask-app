from flask import Flask
from flask import jsonify, request
from flask_cors import CORS
from flask_mongoengine import MongoEngine
import mongoengine as me

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    "db": "quickstart",
    "host": 'mongodb+srv://nitzan:3tVp3LjvGl1Z49G7@cluster0.jcqaovf.mongodb.net/quickstart'
}
app.config["DEBUG"] = True

db = MongoEngine(app)
CORS(app)

class hero(me.Document):
    id = me.IntField(primary_key=True)
    name = me.StringField(required=True)


init_heroes = [ { 'id': 11, 'name': 'Dr Nice' },
  { 'id': 12, 'name': 'Narco' },
  { 'id': 13, 'name': 'Bombasto' },
  { 'id': 14, 'name': 'Celeritas' },
  { 'id': 15, 'name': 'Magneta' },
  { 'id': 16, 'name': 'RubberMan' },
  { 'id': 17, 'name': 'Dynama' },
  { 'id': 18, 'name': 'Dr IQ' },
  { 'id': 19, 'name': 'Magma' },
  { 'id': 20, 'name': 'Tornado' }]

#enter initial data
def build_db():
    if int(hero.objects.count())<1:
        print('build data')
        hero_insert=[hero(**data) for data in init_heroes]
        hero.objects.insert(hero_insert,load_bulk=False)
    else:
        print('db is exist')

build_db()

#routes

#get data from mongo
@app.route('/', methods=['GET'])
def heroes():
    return jsonify(hero.objects())

#get specific  hero
@app.route('/detail/<id>', methods=['GET'])
def detail(id):
  print('start fetch')
  for x in hero.objects():
    if int(x['id'])== int(id):
      return jsonify(x)
  
  return 'record not found', 400

#update specific hero
@app.route('/update',methods=['POST'])
def update():
  print('start update')
  data = request.json
  findHero=hero.objects(id=data['_id'])
  findHero.update(name=data['name'])
  print('update success')

  
  return 'non match',300

#add hero
@app.route('/add',methods=['POST'])
def add_hero():
  data=request.json
  checkNames=hero.objects()
  for x in checkNames:
    if x['name'] == data['hero']:
      return 'existed name'

  newId=int(hero.objects.count())
  newId+=11
  new={"id": newId, 'name': data['hero']}
  hero(name=data['hero'],id=newId).save()
  

  return 'non',340


app.run()