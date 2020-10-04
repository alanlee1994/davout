from flask import Flask
import sys
import psycopg2
import collections
import pdb
import json

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


        
def queryDB(query):
    con = psycopg2.connect(database="postgres", 
                            user="postgres", 
                            password="pokiki123", 
                            port="5432")
    cursor = con.cursor()
    cursor.execute(query)
    rows = cursor.fetchall()
    data = {'max': rows[0][0],
            'min': rows[0][1],
            'avg': rows[0][2]}
    pdb.set_trace()
    return data


if __name__ =='__main__':
    query = "SELECT max(a.close) as max , min(a.close) as min, avg(a.close) as avg FROM (SELECT * FROM signal.ohlc ORDER BY datetime DESC LIMIT 10) AS a"
    queryDB(query)
