module.exports = {
	fields:[
		{
			name: 'Work Type',
			tagName: 'workType',
			type: 'list',
			display: 'show'

		},
		{
			name: 'Hour Type',
			tagName: 'hourType',
			type: 'list',
			display: 'show'
		},
		{
			name: 'SLA',
			tagName: 'sla',
			type: 'list',
			display: 'show'
		},
		{
			name: 'Contract Type',
			tagName: 'contractType',
			type: 'list',
			display: 'show'
		},
		{
			name: 'Hourly Staff/Project Rate -or- Fee ',
			tagName: 'rateType',
			type: 'input',
			display: 'hidden'
		},
	], 
	newTasks:[

		{
			rate: 100,			
			name: 'Onsite',
			tagName: 'onsite',
			type: 'combine',
			parent: 'workType'
		},
		{
			rate: 75,			
			name: 'Remote',
			tagName: 'remote',
			type: 'combine',
			parent: 'workType'
		},
		{
			rate: 85,
			name: 'Bench',
			tagName: 'bench',
			type: 'combine',
			parent: 'workType'  
		},
		{
			rate: 0,
			name: 'Business Hours',
			tagName: 'business_hours',
			type: 'combine',
			parent: 'hourType'  
		},
	    {
			rate: 35,
			name: 'After Business Hours',
			tagName: 'after_business_hours',
			type: 'combine',
			parent: 'hourType'    
		},
		{
			rate: 45,
			name: 'Weekend Standard Hours',
			tagName: 'weekend_standard_hours',
			type: 'combine',
			parent: 'hourType'  
		},
		{
			rate: 55,
			name: 'Weekend After Business Hours', 
			tagName: 'weekend_after_business_hours',
			type: 'combine',
			parent: 'hourType'   
		},
		{
			rate: 0,
			name :'Warranty',
			tagName: 'warranty',
			type: 'reset',
			parent: 'sla'
		}, 
		{
			rate: 0,
			name: 'Standard',
			tagName: 'standard',
			type: 'combine',
			parent: 'sla'
		},
		{
			rate: 50,
			name: 'Advanced',
			tagName: 'advanced',
			type: 'combine',
			parent: 'sla'
		},
		{
			rate: 100,
			name: 'Emergency',
			tagName: 'emergency',
			type: 'combine',
			parent: 'sla'
		},
		{
			rate: 150,
			name: 'Critical',
			tagName: 'critical',
			type: 'combine',
			parent: 'sla' 
		},
		{
			rate: 0,
			name: 'Hourly Task Rate',
			tagName: 'task-rate',
			type: 'combine',
			contractType: 'task-rate',
			parent: 'contractType'
		},
		{
			name:'Hourly Staff Rate',
			tagName: 'staff-rate',
			type: 'custom',
			contractType: 'staff-rate',
			parent: 'contractType'
		},
		{
			name: 'Hourly Project Rate',
			tagName: 'project-rate',
			type: 'custom',
			contractType: 'project-rate',
			parent: 'contractType'
		},
		{
			name:'Flat Project Fee',
			tagName: 'flat-rate',
			type: 'custom',
			contractType: 'flat-rate',
			parent: 'contractType'
		}
	]
}