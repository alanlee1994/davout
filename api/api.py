from flask import Flask
import sys
import psycopg2
import collections
import pdb
import json

app = Flask(__name__)

@app.route('/pricedata', methods=['GET'])
def pricedata():
    data = queryDB("SELECT * FROM signal.ohlc ORDER BY datetime DESC LIMIT 10;", process_row)
    return data

@app.route('/statistics', methods=['GET'])
def statistics():
    data = queryDB("SELECT max(a.close) as max , min(a.close) as min, avg(a.close) as avg FROM (SELECT * FROM signal.ohlc ORDER BY datetime DESC LIMIT 10) AS a", 
                processStatistics)
    return data

# processing of data into json format.
def process_row(rows):
    payload = dict([values for values in enumerate(rows)])
    json_object = {}
    for key in payload.keys():
        data_tuple = payload[key]
        storage = {}
        storage['date']=str(data_tuple[0])
        storage['open']=data_tuple[1]
        storage['close']=data_tuple[2]
        storage['high']=data_tuple[3]
        storage['low']=data_tuple[4]
        json_object[key] = storage
    return json_object

def processStatistics(rows):
    return {'max': rows[0][0],
            'min': rows[0][1],
            'avg': rows[0][2]}


# query.
def queryDB(query, method):
    con = psycopg2.connect(database="postgres", 
                            user="postgres", 
                            password="pokiki123", 
                            port="5432")
    cursor = con.cursor()
    cursor.execute(query)
    rows = cursor.fetchall()
    data = method(rows)
    return data

