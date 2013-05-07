module.exports = {
	newTasks:[
		{
			rate: 100,			
			name: 'Onsite',
			tagName: 'onsite',
			type: 'combine'
		},
		{
			rate: 75,			
			name: 'Remote',
			tagName: 'remote',
			type: 'combine'
		},
		{
			rate: 85,
			name: 'Bench',
			tagName: 'bench',
			type: 'combine'  
		},
		{
			rate: 0,
			name: 'Business Hours',
			tagName: 'business_hours',
			type: 'combine'  
		},
	    {
			rate: 35,
			name: 'After Business Hours',
			tagName: 'after_business_hours',
			type: 'combine'    
		},
		{
			rate: 45,
			name: 'Weekend Standard Hours',
			tagName: 'weekend_standard_hours',
			type: 'combine'  
		},
		{
			rate: 55,
			name: 'Weekend After Business Hours', 
			tagName: 'weekend_after_business_hours',
			type: 'combine'   
		},
		{
			rate: 0,
			name :'Warranty',
			tagName: 'warranty',
			type: 'reset'
		}, 
		{
			rate: 0,
			name: 'Standard',
			tagName: 'standard',
			type: 'combine'
		},
		{
			rate: 50,
			name: 'Advanced',
			tagName: 'advanced',
			type: 'combine'
		},
		{
			rate: 100,
			name: 'Emergency',
			tagName: 'emergency',
			type: 'combine'
		},
		{
			rate: 150,
			name: 'Critical',
			tagName: 'critical',
			type: 'combine' 
		},
		{
			rate: 0,
			name: 'Hourly Task Rate',
			tagName: 'task-rate',
			type: 'combine',
			contractType: 'task-rate'
		},
		{
			name:'Hourly Staff Rate',
			tagName: 'staff-rate',
			type: 'custom',
			contractType: 'staff-rate'
		},
		{
			name: 'Hourly Project Rate',
			tagName: 'project-rate',
			type: 'custom',
			contractType: 'project-rate'
		},
		{
			name:'Flat Project Fee',
			tagName: 'flat-rate',
			type: 'custom',
			contractType: 'flat-rate'
		}
	]
}