from flask import Flask,render_template,request
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import re
import os
def returnstatusReport(adict):
    data=[]
    for name,plague in adict.items():
        student=[]
        student.append(name)
        diff=0.65-plague
        student.append(int(diff*100))
        if(diff>0):
            student.append("PASSED")
        else:
            student.append("FAILED")
        data.append(student)
    return data,len(data)
global name
def remove_html_tags(text):
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)
app=Flask(__name__,static_folder='static/')
@app.route('/')
def start():
	return render_template('login - Copy.html')
@app.route('/index',methods=['POST'])
def loadtest():
	global name
	if request.method=='POST':
		name=request.form['name']
	return render_template('index.html')
@app.route('/test',methods=['POST'])
def submit():
	global name
	if request.method=="POST":
		f=open('Files/'+name+".txt",'a')		
		text=request.form['content']
		text=text.replace("%nbsp;",' ')
		f.write(text)
		f.write("\n--") # cloud
	return render_template('index.html')
@app.route('/dashboard')
def start2():
	try:
		dirs=os.listdir("Files/")  
		linesnohtml=[]
		adict={}
		for file in dirs:
			with open('Files/'+file,'r') as f:
				str2=f.read()
				str2=str2.replace('\n\n\n','')
				str2=str2.replace('\n\n','')
				str2=str2.replace('\n',' ')
				str2=str2.replace('--','')
				str2=remove_html_tags(str2)
				linesnohtml.append(str2)
				adict[file[:-4]]=0
		vectorizer=CountVectorizer(ngram_range=(1,2))
		vector=vectorizer.fit_transform(linesnohtml)
		vector=vector.toarray()
		sim=cosine_similarity(vector)
		for i in range(sim.shape[0]):
			sim[i][i]=0
		for i,j in enumerate(adict):
			arg=np.max(sim[i])
			adict[j]=arg
		result,no=returnstatusReport(adict)
		return render_template('dashboard.html',mat=result,no=no)
	except:
		result=render_template('dashboard.html')
if __name__=='__main__':
	app.run(debug = True )