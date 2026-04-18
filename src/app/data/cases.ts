import { Case } from '../types/game';

export const cases: Case[] = [
  {
    id: 'case-001',
    title: 'The E11 Plastic Peril',
    description: 'A reckless driver tossed a garbage bag full of non-biodegradable waste out of their window while speeding down Sheikh Zayed Road (E11) near the Jebel Ali toll gate.',
    briefing: 'Detective, we have an environmental crime on the E11! A smart traffic camera caught someone dumping a garbage bag full of plastic waste onto Sheikh Zayed Road near the Jebel Ali toll gate. However, due to a recent sandstorm, the camera lens was obscured and the ANPR system captured a corrupted license plate reading.\n\nYour mission:\n1. Use the EVIDENCE FILES to gather clues about the suspect vehicle.\n2. Open the DECRYPTION SOFTWARE (Python) and use extract_numbers() to clean the corrupted plate data.\n3. Query the VEHICLE REGISTRY database using SQL to find the emirates_id linked to the cleaned plate number.\n4. Use a SQL JOIN (or a second query on the SUSPECTS table) to find the name of the person matching that emirates_id.\n5. Cross-reference the vehicle details with the evidence to confirm your suspect.\n6. When you are confident, click ACCUSE and enter the suspect\'s full name.',
    difficulty: 1,
    culprit: 'Ahmed Khalfan',
    type: 'Illegal Waste Dumping',
    location: 'Sheikh Zayed Road (E11)',
    suspects: [
      {
        id: 's1',
        name: 'Ahmed Khalfan',
        age: 34,
        occupation: 'Construction Worker',
        location: 'Jebel Ali',
        alibi: 'Claims he was at home watching TV all evening',
        background: 'Works at a construction site in Jebel Ali Industrial Area',
        eyeColor: 'Brown',
        height: 175,
        weight: 78,
        dateJoined: '2024-06-15',
        dateOfBirth: '1992-02-10'
      },
      {
        id: 's2',
        name: 'Sarah Mitchell',
        age: 29,
        occupation: 'Environmental Officer',
        location: 'Dubai Marina',
        alibi: 'Conducting waste inspections in Al Quoz',
        background: 'Works for Dubai Municipality, dedicated to environmental protection',
        eyeColor: 'Blue',
        height: 168,
        weight: 62,
        dateJoined: '2022-03-20',
        dateOfBirth: '1997-08-15'
      },
      {
        id: 's3',
        name: 'Khalid Al-Mansoori',
        age: 45,
        occupation: 'Delivery Driver',
        location: 'Al Barsha',
        alibi: 'Making deliveries in Sharjah all afternoon',
        background: 'Professional driver for a logistics company, 8 years clean record',
        eyeColor: 'Brown',
        height: 172,
        weight: 85,
        dateJoined: '2019-01-10',
        dateOfBirth: '1981-05-22'
      },
      {
        id: 's4',
        name: 'Marina Popov',
        age: 38,
        occupation: 'Restaurant Owner',
        location: 'Jumeirah',
        alibi: 'Working at restaurant during dinner rush',
        background: 'Runs eco-friendly restaurant, actively promotes recycling',
        eyeColor: 'Green',
        height: 165,
        weight: 58,
        dateJoined: '2020-09-05',
        dateOfBirth: '1988-11-30'
      },
      {
        id: 's5',
        name: 'Simreen Siraj',
        age: 27,
        occupation: 'Detective',
        location: 'Dubai',
        alibi: 'Off duty, visiting family in Sharjah',
        background: 'Top detective with 47 cases solved, couldn\'t possibly be involved',
        eyeColor: 'Brown',
        height: 165,
        weight: 58,
        dateJoined: '2020-01-15',
        dateOfBirth: '1999-04-12'
      },
      {
        id: 's6',
        name: 'Hishaam Abdul',
        age: 28,
        occupation: 'Detective',
        location: 'Abu Dhabi',
        alibi: 'Working on another case at headquarters',
        background: 'Brilliant detective with 42 solved cases, highly respected in the force',
        eyeColor: 'Brown',
        height: 178,
        weight: 75,
        dateJoined: '2020-06-01',
        dateOfBirth: '1998-09-23'
      }
    ],
    evidence: [
      {
        id: 'e1',
        type: 'ANPR Camera Log',
        description: 'Corrupted license plate reading from traffic camera',
        location: 'E11 Near Jebel Ali Toll Gate',
        timestamp: '2026-03-29 18:34:00',
        relatedTo: [],
        imageUrl: '/images/e01.png',
        content: 'ANPR system captured plate data: "B!5@8#9$1^2"\n\nThe reading is corrupted due to a sandstorm obscuring the camera lens. Special characters have been injected into the plate number.\n\nACTION REQUIRED: Use the Decryption Software (Python) to extract the real plate number. Try: extract_numbers("B!5@8#9$1^2") to pull out the digits, then prepend the letter "B" to form the full plate ID.'
      }
    ],
    locations: [
      {
        id: 'l1',
        name: 'E11 Sheikh Zayed Road - Jebel Ali Section',
        type: 'Crime Scene',
        address: 'E11 Highway, Near Jebel Ali Toll Gate (KM 42.7)',
        description: 'Major highway where illegal waste dumping occurred. Heavy sandstorm conditions at time of incident. Adjacent to Jebel Ali Wildlife Sanctuary buffer zone.',
        lastActivity: '2026-03-29 18:34:00 - Garbage bag dumped from moving vehicle'
      },
      {
        id: 'l2',
        name: 'Dubai Vehicle Registry Office',
        type: 'Investigation Location',
        address: 'Dubai Traffic Department, Al Barsha',
        description: 'Central database containing all vehicle registration information in Dubai. Query using SQL to look up plate owners.',
        lastActivity: '2026-03-29 21:00:00 - Database available for queries'
      }
    ],
    solution: {
      who: 'Ahmed Khalfan',
      why: 'Construction worker who refused to pay the 50 AED waste disposal fee and thought dumping trash on the highway during a sandstorm would go undetected. He has 2 previous warnings for improper waste disposal at construction sites.',
      how: 'While driving home on E11 at 18:34, Ahmed threw a garbage bag containing construction waste from his white SUV window at 112 km/h. The ANPR camera captured a corrupted plate reading "B!5@8#9$1^2" due to the sandstorm. Cleaning the data with Python revealed plate B58912. SQL query of the vehicle registry confirmed the plate belongs to Ahmed Khalfan — owner of a white car that passed the Jebel Ali toll at exactly 18:34, matching the traffic camera footage and witness statement.'
    }
  },
  {
    id: 'case-002',
    title: 'The Mangrove Midnight Spiller',
    description: 'Environmental disaster at Jubail Mangrove Park! A tanker truck dumped unauthorized industrial solvent directly into the mangrove root system under cover of darkness.',
    briefing: 'Detectives, we have a Code Red at the Jubail Mangrove Park. Someone backed a tanker truck up to the water under cover of darkness and dumped industrial solvent right into the mangrove root system! Park Rangers found a burner phone dropped in the mud with an encrypted message.\n\nYour mission:\n1. Examine the EVIDENCE FILES — one contains an encrypted message, another contains a clue to the cipher shift, and a third is a traffic camera screenshot.\n2. Use the DECRYPTION SOFTWARE (Python) with caesar_cipher() to decrypt the message. The decrypted text reveals a chemical batch code.\n3. Open the SQL TERMINAL and run SHOW TABLES to see the available databases. Query the chemical_imports table to find which companies imported that batch.\n4. Multiple companies will match — use the traffic camera evidence and the fleet_logs table to narrow down which company had a vehicle near Jubail at the time of the crime.\n5. Finally, query the corporate_registry table to find the CEO of the guilty company.\n6. When you are confident, click ACCUSE and enter the suspect\'s full name.',
    difficulty: 1,
    culprit: 'Simreen Siraj',
    type: 'Illegal Chemical Dumping',
    location: 'Jubail Mangrove Park',
    suspects: [
      {
        id: 's20',
        name: 'Simreen Siraj',
        age: 42,
        occupation: 'Business Owner',
        location: 'Mussafah Industrial Zone',
        background: 'Runs a chemical transport and disposal company in the industrial zone',
        eyeColor: 'Brown',
        height: 178,
        weight: 88,
        dateJoined: '2018-07-10',
        dateOfBirth: '1984-03-18'
      },
      {
        id: 's21',
        name: 'Fatima Al-Mazrui',
        age: 35,
        occupation: 'Environmental Scientist',
        location: 'Al Reem Island',
        background: 'PhD in Marine Biology, dedicated to mangrove conservation',
        eyeColor: 'Brown',
        height: 165,
        weight: 60,
        dateJoined: '2015-09-01',
        dateOfBirth: '1991-11-25'
      },
      {
        id: 's22',
        name: 'Mohammed Hassan',
        age: 38,
        occupation: 'Park Ranger',
        location: 'Khalifa City',
        background: 'Former military, loves nature, protects mangroves',
        eyeColor: 'Brown',
        height: 182,
        weight: 90,
        dateJoined: '2012-05-15',
        dateOfBirth: '1988-07-03'
      },
      {
        id: 's23',
        name: 'Layla Ibrahim',
        age: 29,
        occupation: 'Marine Biologist',
        location: 'Saadiyat Island',
        background: 'Studies coastal ecosystems, published papers on mangrove importance',
        eyeColor: 'Green',
        height: 170,
        weight: 65,
        dateJoined: '2020-02-10',
        dateOfBirth: '1997-04-20'
      }
    ],
    evidence: [
      {
        id: 'e60',
        type: 'Encrypted Message',
        description: 'Caesar cipher found on burner phone in the mud',
        location: 'Jubail Mangrove Park',
        timestamp: '2026-03-30 02:15:00',
        relatedTo: [],
        imageUrl: '/images/e60.png',
        content: 'Mre grqh. Edwfk #VY-AQE lv lq wkh pxg. Whoo wkh ervv wr zluh wkh uhvw ri wkh ixqgv wr wkh vkhoo dffrxqw.'
      },
      {
        id: 'e61',
        type: 'Crime Scene Photo',
        description: 'Photo found on the burner phone gallery',
        location: 'Jubail Mangrove Park - Burner Phone',
        timestamp: '2026-03-30 02:15:00',
        relatedTo: [],
        imageUrl: '/images/e61.png'
      },
      {
        id: 'e62',
        type: 'Traffic Camera Footage',
        description: 'Night-vision camera near Jubail Mangrove Park entrance',
        location: 'Jubail Mangrove Park - Gate Camera',
        timestamp: '2026-03-30 02:44:00',
        relatedTo: [],
        imageUrl: '/images/e62.png'
      },
      {
        id: 'e63',
        type: 'Additional Evidence',
        description: 'Photo recovered from the crime scene',
        location: 'Jubail Mangrove Park',
        timestamp: '2026-03-30 03:00:00',
        relatedTo: [],
        imageUrl: '/images/e63.png'
      }
    ],
    locations: [
      {
        id: 'l10',
        name: 'Jubail Mangrove Park',
        type: 'Crime Scene',
        address: 'Jubail Island, Abu Dhabi',
        description: 'Protected mangrove ecosystem, tourist kayaking destination, vital carbon sequestration zone',
        lastActivity: '2026-03-30 02:00:00 - Industrial solvent dumped into water'
      },
      {
        id: 'l11',
        name: 'Mussafah Industrial Zone',
        type: 'Suspect Location',
        address: 'Mussafah, Abu Dhabi',
        description: 'Industrial area with chemical processing facilities and transport companies',
        lastActivity: '2026-03-29 22:00:00 - Chemical load pickup'
      }
    ],
    solution: {
      who: 'Simreen Siraj',
      why: 'CEO of Gulf Chemicals LLC, ordered an illegal midnight dump of industrial solvent to avoid the 5,000 AED legal disposal fee and wired payment to a shell account.',
      how: 'A burner phone found at the scene contained an encrypted Caesar cipher message (shift -3). Decrypting it revealed: "Job done. Batch #SV-XNB is in the mud. Tell the boss to wire the rest of the funds to the shell account." Querying chemical_imports for batch SV-XNB returned three companies (C-101, C-103, C-105). The traffic camera showed a tanker at Jubail on date 2026-03-30 at time 0244 — querying fleet_logs for that date and time revealed only company C-101 had a vehicle logged then. Querying corporate_registry for C-101 identified Gulf Chemicals LLC, CEO: Simreen Siraj.'
    }
  },
];
