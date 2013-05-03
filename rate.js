module.exports = {
	workType : {
		onsite:{
			value: 100,
			name: 'Onsite'
		},
		remote:{
			value: 75,
			name: 'Remote' 
		} ,
		bench: {
			value: 85,
			name: 'Bench'  
		}
	},
	hourType : {
		business_hours:{
			value: 0,
			name: 'Business Hours'  
		},
		after_business_hours: {
			value: 35,
			name: 'After Business Hours'  
		},
		weekend_standard_hours: {
			value: 45,
			name: 'Weekend Standard Hours'  
		},
		weekend_after_business_hours: {
			value: 55,
			name: 'Weekend After Business Hours'  
		}
	},
	sla : {
		warranty:{
			value: 0,
			name :'Warranty'
		}, 
		standard:{
			value: 0,
			name: 'Standard'
		},
		advanced: {
			value: 50,
			name: 'Advanced '
		},
		emergency: {
			value: 100,
			name: 'Emergency'
		},
		critical: {
			value: 150,
			name: 'Critical' 
		}
	},
	hourlyTask: {
		taskrate :{
			name:'Hourly Task Rate'
		},
		staffrate: {
			name:'Hourly Staff Rate'
		},
		projectrate: {
			name: 'Hourly Project Rate'
		},
		flatrate: {
			name:'Flat Project Fee'
		}
	}
}