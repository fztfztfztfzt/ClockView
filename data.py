from flask import Flask,request,Response
from flask.ext.cors import CORS
import csv
import json

app = Flask(__name__)
CORS(app)

DATA=[]
view1_matrix = {}
MMM = 64

	
@app.route('/data',methods=['POST', 'GET'])
def filter_data():
	date = request.args.get('date', '')
	IP1 = request.args.get('IP1', '')
	IP2 = request.args.get('IP2', '')
	protocol = request.args.get('protocol', '')
	result = []
	output = open('result.csv', 'w')
	for i in DATA:
		if dateOk(i[0],date) and IPOk(i[2],i[3],IP1,IP2) and protocolOk(i[5],protocol):
			result.append(i)
			d = ','.join(i) + '\n'
			output.write(d)
	output.close()
	def generate():
		for row in result:
			yield ','.join(row) + '\n'
	return Response(generate(), mimetype="text/csv")

def dateOk(d,date):
	if d==date:
		return True
	return False

def IPOk(i1,i2,ip1,ip2):
	if ip2=='':
		if ip1=='':
			return True
		else:
			if i1==ip1 or i2==ip1:
				return True
			else:
				return False
	else:
		if (i1==ip1 and i2==ip2) or (i2==ip1 and i1==ip2):
			return True
		return False
	return False
	
def protocolOk(i,p):
	if p=='':
		return True
	if i==p:
		return True
	return False
	
@app.route('/view1_matrix',methods=['POST', 'GET'])
def get_view1_matrix():
	for i in range(MMM):
		for j in range(MMM):
			view1_matrix[str(i)+'.'+str(j)]={}
			for k in range(24):
				view1_matrix[str(i)+'.'+str(j)][k]=0
	result = []
	csvfile = file('result.csv', 'rb')
	reader = csv.reader(csvfile)
	for date,time,srcIP,dstIP,port,protocol,flow,data in reader:
		result.append([date,time,srcIP,dstIP,port,protocol,flow,data])	
	csvfile.close()
	data_type = request.args.get('data_type', '')
	flowFrom = request.args.get('flowFrom', '')
	flowTo = request.args.get('flowTo', '')
	traffic_type = request.args.get('traffic_type', '')
	view1_line = {}
	for i in result:
		if i[2][0:7]=="202.120" and traffic_type!='incoming':
			ip34 = i[2].split('.')
			ip34 = ip34[2]+'.'+ip34[3]
			t = int(i[1].split(':')[0])
			f = int(i[6])
			view1_matrix[ip34][t]+=f
		if i[3][0:7]=="202.120" and traffic_type!='outgoing':
			ip34 = i[3].split('.')
			ip34 = ip34[2]+'.'+ip34[3]
			t = int(i[1].split(':')[0])
			f = int(i[6])
			view1_matrix[ip34][t]+=f
		if i[2][0:7]=="202.120" and i[3][0:7]=="202.120":
			sip34 = i[2].split('.')
			sip34 = sip34[2]+'.'+sip34[3]
			dip34 = i[3].split('.')
			dip34 = dip34[2]+'.'+dip34[3]
			if view1_line.has_key(sip34):
				view1_line[sip34]+=("|"+dip34)
			else:
				view1_line[sip34] = dip34
	if data_type=='percentage':
		pass
	if flowFrom!='' and flowTo!='':
		flowFrom = int(flowFrom)
		flowTo = int(flowTo)
		for i in range(MMM):
			for j in range(MMM):
				for k in range(24):
					if view1_matrix[str(i)+'.'+str(j)][k]<flowFrom or view1_matrix[str(i)+'.'+str(j)][k]>flowTo:
						view1_matrix[str(i)+'.'+str(j)][k]=0
	re = {'matrix':view1_matrix,'line':view1_line}
	return Response(json.dumps(re), mimetype='application/json')
	
@app.route('/view1_mm',methods=['POST', 'GET'])
def get_min_max():
	view1_max=0
	view1_min=99999999999999999999999
	result = []
	csvfile = file('result.csv', 'rb')
	reader = csv.reader(csvfile)
	for date,time,srcIP,dstIP,port,protocol,flow,data in reader:
		result.append([date,time,srcIP,dstIP,port,protocol,flow,data])	
	csvfile.close()
	for i in range(MMM):
		for j in range(MMM):
			for k in range(24):
				f = view1_matrix[str(i)+'.'+str(j)][k]
				if f>view1_max:
					view1_max=f
				if f<view1_min:
					view1_min=f
	r = {'min':view1_min,'max':view1_max}	
	return Response(json.dumps(r), mimetype='application/json')
	
@app.route('/view2_matrix',methods=['POST', 'GET'])
def get_view2_matrix():	
	IP = request.args.get('IP', '')
	rrrr = {'Host':0,'Outgoing':0,'data':0}
	h = []
	rrr = {}
	for i in DATA:
		if i[2]==IP or i[3]==IP:
			if i[2]==IP:
				if not i[3] in h:
					h.append(i[3])
					rrrr['Outgoing'] +=1
			if i[3]==IP:
				if not i[2] in h:
					h.append(i[2])
			d = i[0]
			t = int(i[1].split(':')[0])
			f = int(i[6])
			if rrr.has_key(d):
				rrr[d][t] += f
			else:
				rrr[d] = {}
				for i in range(24):
					rrr[d][i]=0
				rrr[d][t] = f
	rrrr['data'] = rrr
	rrrr['Host'] = len(h)
	return Response(json.dumps(rrrr), mimetype='application/json')

"""
@app.route('/view2_force',methods=['POST', 'GET'])
def get_view2_force():
	pass
"""	
@app.route('/')
def index():
    return 'Index Page'
	
def Get_Data():
	reader = csv.reader(open("data.csv"))
	for date,time,srcIP,dstIP,port,protocol,flow,data in reader:
		DATA.append([date,time,srcIP,dstIP,port,protocol,flow,data])	
	
	
if __name__ == '__main__':
	Get_Data()
	app.debug = True
	app.run()
