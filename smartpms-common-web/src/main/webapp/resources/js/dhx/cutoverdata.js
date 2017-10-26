var tasks = 
{

	"data":[
	        {"id":"f101", "text":"사전준비", "parent":"", "open": false, "type":"folder"},
	        {"id":"f102", "text":"사전이행", "parent":"", "open": true, "type":"folder"},
	        {"id":"f103", "text":"전환가동", "parent":"", "open": true, "type":"folder"},
	        {"id":"f104", "text":"데이터본이행", "parent":"", "open": true, "type":"folder"},
	        {"id":"f105", "text":"가동점검", "parent":"", "open": true, "type":"folder"},
	        {"id":"f106", "text":"사전가동", "parent":"", "open": true, "type":"folder"},
	        {"id":"f107", "text":"사후이행", "parent":"", "open": true, "type":"folder"},
	        {"id":"f108", "text":"가동", "parent":"", "open": true, "type":"folder"},
	        
	        {"id":"f201", "text":"SR Freezing", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f202", "text":"대외업무 협조요청", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f203", "text":"연동시스템 준비상태 점검", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f204", "text":"사용자 환경점검", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f205", "text":"사용자 공지", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f206", "text":"시스템 환경 점검", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f207", "text":"S/W 환경점검", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f208", "text":"DB/AP Freezing", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f209", "text":"AP 동합빌드/배포", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f210", "text":"FM DB 이행", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f211", "text":"FM SP 배포", "parent":"f101", "open": true, "type":"folder"},
	        {"id":"f212", "text":"Application 환경점검", "parent":"f101", "open": true, "type":"folder"},
	        
	        {"id":"f201_001", "text":"Cut-Over", "parent":"f201", "open": true, "type":"folder"},
	        {"id":"f202_001", "text":"Cut-Over", "parent":"f202", "open": true, "type":"folder"},
	        {"id":"f203_001", "text":"Cut-Over", "parent":"f203", "open": true, "type":"folder"},
	        {"id":"f204_001", "text":"AA", "parent":"f204", "open": true, "type":"folder"},
	        {"id":"f204_002", "text":"WM", "parent":"f204", "open": true, "type":"folder"},
	        
	        {"id":"CO-01-0010-001", "text":"SR Freezing", "start_date":"2014-01-18 09:00", "end_date":"2014-01-18 18:00", "duration_dp":"2", "parent":"f201_001", "open": true, "status":"0", "step":"0", "taskteam":"Cut-Over", "taskp1":"김진경", "taskp2":"김진경", "taskp3":"이강식", "taskid":"01-사전준비-0010", "jiraid":"OSSCM-1234", "jirastatus":"Open", "type":"task"},
	        {"id":"CO-01-0020-001", "text":"업무전환 기간 청약 최소화 요청", "start_date":"2014-01-18 09:00", "end_date":"2014-01-26 18:00", "duration_dp":"4", "parent":"f202_001", "open": true, "status":"0", "step":"0", "taskteam":"Cut-Over", "taskp1":"조문희", "taskp2":"김진경", "taskp3":"이강식", "taskid":"01-사전준비-0020", "jiraid":"OSSCM-1234", "jirastatus":"Open", "type":"task"},
	        {"id":"CO-01-0020-002", "text":"전환기간 Olleh.com 개통 접수금지 요청", "start_date":"2014-01-18 09:00", "end_date":"2014-01-26 18:00", "duration_dp":"4", "parent":"f202_001", "open": true, "status":"0", "step":"0", "taskteam":"Cut-Over", "taskp1":"조문희", "taskp2":"김진경", "taskp3":"이강식", "taskid":"01-사전준비-0020", "jiraid":"OSSCM-1234", "jirastatus":"Open", "type":"task"},
	        {"id":"CO-01-0020-003", "text":"전환기간 사용자 접속제한 요청", "start_date":"2014-01-18 09:00", "end_date":"2014-01-26 18:00", "duration_dp":"4", "parent":"f202_001", "open": true, "status":"0", "step":"0", "taskteam":"Cut-Over", "taskp1":"조문희", "taskp2":"김진경", "taskp3":"이강식", "taskid":"01-사전준비-0020", "jiraid":"OSSCM-1234", "jirastatus":"Open", "type":"task"},
			{"id":"CO-01-0030-001", "text":"연동시스템 준비상태 점검", "start_date":"2014-02-03 09:00", "end_date":"2014-02-07 18:00", "duration_dp":"4", "parent":"f203_001", "open": true, "status":"0", "step":"0", "taskteam":"Cut-Over", "taskp1":"조문희", "taskp2":"김진경", "taskp3":"이강식", "taskid":"01-사전준비-0030", "jiraid":"OSSCM-1234", "jirastatus":"Open", "type":"task"},
			{"id":"CO-01-0040-001", "text":"PC 환경정보 작성 제공", "start_date":"2014-02-03 09:00", "end_date":"2014-02-07 18:00", "duration_dp":"4", "parent":"f204_001", "open": true, "status":"0", "step":"0", "taskteam":"AA", "taskp1":"임지훈", "taskp2":"임지훈", "taskp3":"정종혁", "taskid":"01-사전준비-0040", "jiraid":"OSSCM-1234", "jirastatus":"Open", "type":"task"},
			{"id":"CO-01-0040-002", "text":"Mobile 환경정보 작성 제공", "start_date":"2014-02-03 09:00", "end_date":"2014-02-07 18:00", "duration_dp":"4", "parent":"f204_001", "open": true, "status":"0", "step":"0", "taskteam":"AA", "taskp1":"유주상", "taskp2":"임지훈", "taskp3":"정종혁", "taskid":"01-사전준비-0040", "jiraid":"OSSCM-1234", "jirastatus":"Open", "type":"task"},
			{"id":"CO-01-0040-003", "text":"사용자 단말 및 환경점검", "start_date":"2014-02-03 09:00", "end_date":"2014-02-07 18:00", "duration_dp":"4", "parent":"f204_002", "open": true, "status":"0", "step":"0", "taskteam":"WM", "taskp1":"김형진", "taskp2":"송창근", "taskp3":"주도완", "taskid":"01-사전준비-0040", "jiraid":"OSSCM-1234", "jirastatus":"Open", "type":"task"}
	],
	"links":[
		{"id":"15","source":"13","target":"17","type":"0"},
		{"id":"16","source":"16","target":"26","type":"0"},
		{"id":"17","source":"18","target":"19","type":"0"},
		{"id":"19","source":"15","target":"21","type":"0"},
		{"id":"20","source":"15","target":"22","type":"0"},
		{"id":"21","source":"15","target":"23","type":"0"},
		{"id":"22","source":"18","target":"20","type":"0"},
		{"id":"23","source":"18","target":"21","type":"0"}
	]
}