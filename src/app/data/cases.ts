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
        content: 'ANPR system captured plate data: "B!5@8#9$1^2"\n\nThe reading is corrupted due to a sandstorm obscuring the camera lens. Special characters have been injected into the plate number.\n\nACTION REQUIRED: Use the Decryption Software (Python) to extract the real plate number. Try: extract_numbers("B!5@8#9$1^2") to pull out the digits, then prepend the letter "B" to form the full plate ID.'
      },
      {
        id: 'e2',
        type: 'Traffic Camera Footage',
        description: 'Video of garbage being thrown from vehicle',
        location: 'E11 Camera #2847',
        timestamp: '2026-03-29 18:34:00',
        relatedTo: [],
        content: 'Footage shows a WHITE-COLOURED SUV driving at approximately 110 km/h. The driver-side window opens and a large black garbage bag is thrown onto the highway shoulder. The vehicle does not stop.\n\nVehicle description:\n- Type: SUV\n- Colour: White\n- Speed: ~110 km/h\n- Direction: Northbound on E11\n- Time: 18:34\n\nNote: Plate is unreadable from this angle due to sand on the lens.'
      },
      {
        id: 'e3',
        type: 'Waste Analysis Report',
        description: 'Forensic analysis of dumped garbage bag',
        location: 'Dubai Forensics Lab',
        timestamp: '2026-03-29 20:15:00',
        relatedTo: [],
        content: 'Contents of the recovered garbage bag:\n- Plastic water bottles (12x)\n- Construction site debris (concrete fragments, rebar ties)\n- Food wrappers with Arabic labels\n- Cigarette butts\n- Broken PVC pipe sections\n\nConclusion: Waste profile is consistent with a CONSTRUCTION SITE. The debris is non-biodegradable and poses severe environmental risk to roadside wildlife habitats. DNA analysis on cigarette butts is pending (results expected in 2-3 weeks).'
      },
      {
        id: 'e4',
        type: 'Toll Gate Speed Log',
        description: 'Vehicles flagged for speeding near Jebel Ali toll',
        location: 'E11 Jebel Ali Toll Gate',
        timestamp: '2026-03-29 18:30:00 - 18:40:00',
        relatedTo: [],
        content: 'The following vehicles were flagged by the toll gate speed sensors between 18:30 and 18:40 on March 29:\n\n| Plate     | Speed    | Time     |\n|-----------|----------|----------|\n| F67890    | 102 km/h | 18:31:12 |\n| B58912    | 112 km/h | 18:34:00 |\n| A19743    | 105 km/h | 18:35:22 |\n| O31975    | 98 km/h  | 18:37:45 |\n\nAll vehicles exceeded the 100 km/h speed limit at the toll zone. Plate B58912 matches the exact timestamp of the dumping incident.\n\nUse the SQL Terminal to look up the emirates_id for any plate in vehicle_registry, then JOIN with the suspects table to find the owner\'s name.'
      },
      {
        id: 'e5',
        type: 'Witness Statement',
        description: 'Truck driver who witnessed the incident',
        location: 'Police Statement Room',
        timestamp: '2026-03-29 19:45:00',
        relatedTo: [],
        content: 'Statement from Rashid Al-Blooshi (Truck Driver, E11 regular):\n\n"I was driving northbound behind this white SUV. I noticed it was going fast, maybe 110 or more. Then the window rolls down and a big black bag gets thrown out. The bag hit the shoulder and split open — looked like construction rubbish. I only caught the first two characters of the plate... it started with B5. I reported it to the E11 traffic hotline immediately."'
      },
      {
        id: 'e6',
        type: 'Incident Location Report',
        description: 'Environmental impact assessment at scene',
        location: 'E11 Highway, KM marker 42.7',
        timestamp: '2026-03-29 19:30:00',
        relatedTo: [],
        content: 'Responding officers found a torn garbage bag on the highway shoulder at KM 42.7, near the Jebel Ali Wildlife Sanctuary buffer zone.\n\nEnvironmental risk: HIGH\n- Plastic waste within 200m of protected wildlife corridor\n- PVC fragments could contaminate groundwater drainage\n- Construction debris poses hazard to road maintenance crews\n\nWeather at time of incident: Sandstorm conditions, visibility reduced to 500m. This explains the corrupted ANPR camera reading.'
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
    culprit: 'Omar Abdullah',
    type: 'Illegal Chemical Dumping',
    location: 'Jubail Mangrove Park',
    suspects: [
      {
        id: 's20',
        name: 'Omar Abdullah',
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
        content: 'A burner phone was recovered from the mud near the dumping site. The phone\'s draft messages contained a single encrypted text:\n\n\"Mre grqh. Edwfk #VY-AQE lv lq wkh pxg. Whoo wkh ervv wr zluh wkh uhvw ri wkh ixqgv wr wkh vkhoo dffrxqw.\"\n\nForensics confirms this is a Caesar cipher. Use the Decryption Software (Python) with caesar_cipher() to decode it. You will need to figure out the correct shift value — check the other evidence for a clue.\n\nOnce decrypted, the message should reveal a chemical batch code. Use the SQL Terminal to investigate which company imported that batch.'
      },
      {
        id: 'e61',
        type: 'Crime Scene Photo',
        description: 'Photo found on the burner phone gallery',
        location: 'Jubail Mangrove Park - Burner Phone',
        timestamp: '2026-03-30 02:15:00',
        relatedTo: [],
        content: '[IMAGE EVIDENCE]\n\nA photo recovered from the burner phone\'s gallery shows the side of a tanker truck. A diamond-shaped hazmat placard is visible — bright red with the number 3 printed large in the centre, indicating Class 3: Flammable Liquid. Someone has traced over the number repeatedly in black marker, as though fixating on it.\n\nBelow the placard, a muddy boot print is visible on the truck step.'
      },
      {
        id: 'e62',
        type: 'Traffic Camera Footage',
        description: 'Night-vision camera near Jubail Mangrove Park entrance',
        location: 'Jubail Mangrove Park - Gate Camera',
        timestamp: '2026-03-30 02:44:00',
        relatedTo: [],
        content: '[IMAGE EVIDENCE]\n\nA dark, grainy night-vision screenshot from a traffic camera near the entrance of Jubail Mangrove Park. The image shows the rear of a white industrial tanker truck passing through the gate.\n\nCamera metadata:\n- Date: 2026-03-30\n- Time: 0244\n- Camera ID: JMP-GATE-07\n- Mode: Night Vision (IR)\n\nThe license plate is not readable due to mud splatter, but the vehicle is clearly a heavy tanker truck. Cross-reference this date and time with the fleet_logs database to identify which company operated a vehicle at this time.'
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
      who: 'Omar Abdullah',
      why: 'CEO of Gulf Chemicals LLC, ordered an illegal midnight dump of industrial solvent to avoid the 5,000 AED legal disposal fee and wired payment to a shell account.',
      how: 'A burner phone found at the scene contained an encrypted Caesar cipher message (shift -3). Decrypting it revealed: "Job done. Batch #SV-XNB is in the mud. Tell the boss to wire the rest of the funds to the shell account." Querying chemical_imports for batch SV-XNB returned three companies (C-101, C-103, C-105). The traffic camera showed a tanker at Jubail on date 2026-03-30 at time 0244 — querying fleet_logs for that date and time revealed only company C-101 had a vehicle logged then. Querying corporate_registry for C-101 identified Gulf Chemicals LLC, CEO: Omar Abdullah.'
    }
  },
  {
    id: 'case-003',
    title: 'The Great Haq al Laila Candy Heist',
    description: 'SCANDAL! A precious bag of candy collected by a child during Haq al Laila has been stolen! This traditional Emirati celebration has been RUINED!',
    briefing: 'This is a dark day for UAE traditions, Detective. Little Ahmed, age 7, spent all evening collecting candy during Haq al Laila. His bag containing 23 pieces of candy has vanished from outside Sheikh Zayed Grand Mosque. We must restore justice!',
    difficulty: 1,
    culprit: 'Aisha Mohammed',
    type: 'Candy Theft',
    location: 'Sheikh Zayed Grand Mosque',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-inspire.mp3',
    suspects: [
      {
        id: 's7',
        name: 'Dr. Omar Khalil',
        age: 58,
        occupation: 'University Professor',
        location: 'Al Reem Island',
        alibi: 'Teaching children about Haq al Laila traditions',
        background: 'Respected elder, gives candy TO children, not takes FROM them',
        eyeColor: 'Brown',
        height: 172,
        weight: 76,
        dateJoined: '2010-03-15',
        dateOfBirth: '1968-05-22'
      },
      {
        id: 's8',
        name: 'Aisha Mohammed',
        age: 31,
        occupation: 'Dental Hygienist',
        location: 'Khalidiya',
        alibi: 'Handing out sugar-free alternatives',
        motive: 'Passionate about dental health, hates candy',
        background: 'Known anti-candy activist, runs "Healthy Haq al Laila" campaign',
        eyeColor: 'Brown',
        height: 162,
        weight: 55,
        dateJoined: '2020-01-10',
        dateOfBirth: '1995-12-03'
      },
      {
        id: 's9',
        name: 'Paolo Benedetti',
        age: 45,
        occupation: 'Italian Chef',
        location: 'Yas Island',
        alibi: 'Preparing special desserts',
        background: 'Makes artisanal sweets, would never steal cheap candy',
        eyeColor: 'Green',
        height: 180,
        weight: 84,
        dateJoined: '2024-02-01',
        dateOfBirth: '1981-08-17'
      },
      {
        id: 's10',
        name: 'Hassan Al-Mazrui',
        age: 53,
        occupation: 'Security Guard',
        location: 'Al Shamkha',
        alibi: 'Monitoring celebration security',
        background: 'Ex-police officer, grandfather of 6, loves children',
        eyeColor: 'Brown',
        height: 178,
        weight: 89,
        dateJoined: '2006-07-01',
        dateOfBirth: '1973-03-28'
      }
    ],
    evidence: [
      {
        id: 'e21',
        type: 'Security Footage',
        description: 'Person approaching candy bag',
        location: 'Mosque Courtyard',
        timestamp: '2026-03-25 20:34:00',
        relatedTo: ['s8'],
        content: 'Video shows woman in dental association t-shirt picking up colorful bag, examining contents, shaking head disapprovingly.'
      },
      {
        id: 'e22',
        type: 'Social Media Post',
        description: 'Anti-candy campaign post',
        location: 'Instagram',
        timestamp: '2026-03-25 18:00:00',
        relatedTo: ['s8'],
        content: 'Aisha posted: "Tonight I wage war on tooth decay! Every candy I confiscate is a cavity prevented! 🦷💪 #HealthyHaqalLaila"'
      },
      {
        id: 'e23',
        type: 'Witness Statement',
        description: 'Child saw lady with bag',
        location: 'Police Statement',
        timestamp: '2026-03-25 21:00:00',
        relatedTo: ['s8'],
        content: 'Ahmed (age 7) reports: "A lady in a teeth shirt took my bag! She said candy is dangerous! She gave me a toothbrush instead! 😭"'
      },
      {
        id: 'e24',
        type: 'Confiscated Items',
        description: 'Candy found in dental office',
        location: 'Aisha\'s Dental Clinic',
        timestamp: '2026-03-26 09:00:00',
        relatedTo: ['s8'],
        content: 'Search warrant reveals 47 bags of "confiscated" Haq al Laila candy in office storage. One bag matches Ahmed\'s description exactly.'
      },
      {
        id: 'e25',
        type: 'Text Messages',
        description: 'Planning the operation',
        location: 'Phone Records',
        timestamp: '2026-03-24 10:15:00',
        relatedTo: ['s8'],
        content: 'Text to dental colleague: "Tomorrow night begins operation Cavity Prevention. I\'ll be confiscating sugar bombs all evening! 💪"'
      },
      {
        id: 'e26',
        type: 'Toothbrush Receipt',
        description: 'Bulk toothbrush purchase',
        location: 'Pharmacy',
        timestamp: '2026-03-23 14:30:00',
        relatedTo: ['s8'],
        content: 'Aisha purchased 50 toothbrushes with note: "Replacement items for candy confiscation program"'
      },
      {
        id: 'e27',
        type: 'Campaign Flyer',
        description: 'Anti-candy literature',
        location: 'Found at scene',
        timestamp: '2026-03-25 20:35:00',
        relatedTo: ['s8'],
        content: 'Flyer left at scene reads: "Your candy has been confiscated for your dental health. Please contact Khalidiya Dental Clinic for free checkup!"'
      },
      {
        id: 'e28',
        type: 'Previous Complaints',
        description: 'History of candy confiscations',
        location: 'Police Records',
        timestamp: '2025-03-15',
        relatedTo: ['s8'],
        content: '12 formal complaints filed against Aisha for "aggressive candy interventions" during last year\'s Haq al Laila. Warning issued.'
      }
    ],
    locations: [
      {
        id: 'l5',
        name: 'Sheikh Zayed Grand Mosque Courtyard',
        type: 'Crime Scene',
        address: 'Sheikh Zayed Grand Mosque, Abu Dhabi',
        description: 'Location where candy bag was stolen during Haq al Laila celebration',
        lastActivity: '2026-03-25 20:34:00 - Candy theft occurred'
      },
      {
        id: 'l6',
        name: 'Khalidiya Dental Clinic',
        type: 'Evidence Location',
        address: 'Khalidiya District, Abu Dhabi',
        description: 'Dental office where confiscated candy was stored',
        lastActivity: '2026-03-26 09:00:00 - Candy bags discovered'
      }
    ],
    solution: {
      who: 'Aisha Mohammed',
      why: 'Fanatical dental hygienist who believes all candy consumption leads to cavities. Runs self-appointed "candy confiscation" program.',
      how: 'Approached Ahmed\'s candy bag at 20:34, took it while lecturing about tooth decay, left toothbrush as "compensation." Has done this to 47 children.'
    }
  },
  {
    id: 'case-004',
    title: 'The Palm Jumeirah Ding-Dong-Ditch Crisis',
    description: 'BREAKING NEWS: Serial doorbell ringer terrorizes luxury villa! Someone rang a doorbell and RAN AWAY! This neighborhood will never be the same!',
    briefing: 'Detective, we have a code red situation. At 8:47 PM, someone rang the doorbell at Villa #234 on Palm Jumeirah and fled the scene. The homeowner answered the door to find... NOBODY THERE! This prankster must be stopped!',
    difficulty: 2,
    culprit: 'Youssef Ibrahim',
    type: 'Doorbell Mischief',
    location: 'Palm Jumeirah',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-creativemode.mp3',
    suspects: [
      {
        id: 's11',
        name: 'Youssef Ibrahim',
        age: 44,
        occupation: 'TikTok Prankster',
        location: 'Al Ain',
        alibi: 'Claims he was filming elsewhere',
        motive: 'Desperate for viral content, views declining',
        background: 'Has 47 previous prank videos, audience wants more',
        eyeColor: 'Brown',
        height: 176,
        weight: 72,
        dateJoined: '2015-06-01',
        dateOfBirth: '1982-09-14'
      },
      {
        id: 's12',
        name: 'Elena Vasquez',
        age: 36,
        occupation: 'Yoga Instructor',
        location: 'Dubai Marina',
        alibi: 'Teaching evening meditation class',
        background: 'Ultra zen, anti-prank philosophy, promotes peace',
        eyeColor: 'Green',
        height: 165,
        weight: 59,
        dateJoined: '2018-03-15',
        dateOfBirth: '1990-04-22'
      },
      {
        id: 's13',
        name: 'Thomas Winters',
        age: 52,
        occupation: 'Retired Businessman',
        location: 'Dubai',
        alibi: 'At home watching TV',
        background: 'Victim of previous ding-dong-ditch, hates pranks',
        eyeColor: 'Blue',
        height: 182,
        weight: 85,
        dateJoined: '2012-11-20',
        dateOfBirth: '1974-02-08'
      },
      {
        id: 's14',
        name: 'Noor Al-Hashimi',
        age: 29,
        occupation: 'School Teacher',
        location: 'Jumeirah',
        alibi: 'Grading papers at home',
        background: 'Teaches good behavior, model citizen',
        eyeColor: 'Brown',
        height: 170,
        weight: 64,
        dateJoined: '2021-09-01',
        dateOfBirth: '1997-07-11'
      },
      {
        id: 's15',
        name: 'Dmitri Volkov',
        age: 48,
        occupation: 'Security Expert',
        location: 'Business Bay',
        alibi: 'Installing security cameras',
        background: 'Ironically, helps people PREVENT ding-dong-ditch',
        eyeColor: 'Gray',
        height: 188,
        weight: 95,
        dateJoined: '2016-02-10',
        dateOfBirth: '1978-11-25'
      }
    ],
    evidence: [
      {
        id: 'e41',
        type: 'Doorbell Camera',
        description: 'Man in hoodie pressing doorbell',
        location: 'Villa #234',
        timestamp: '2026-03-25 20:47:00',
        relatedTo: ['s11'],
        content: 'Crystal clear footage shows man in "Subscribe!" hoodie pressing doorbell, giggling, then running. Phone held up for selfie angle.'
      },
      {
        id: 'e42',
        type: 'TikTok Draft',
        description: 'Unpublished prank video',
        location: "Youssef's Phone",
        timestamp: '2026-03-25 20:47:30',
        relatedTo: ['s11'],
        content: 'Draft video titled "Epic Ding Dong Ditch Prank in LUXURY Villa!!" Caption: "Part of my comeback series! Drop a like!"'
      },
      {
        id: 'e43',
        type: 'GPS Tracking',
        description: 'Phone location data',
        location: 'Telecom Records',
        timestamp: '2026-03-25 20:47:00',
        relatedTo: ['s11'],
        content: 'Youssef\'s phone GPS places him exactly at Villa #234 at 20:47. Movement pattern: approach, stop 2 seconds, rapid retreat.'
      },
      {
        id: 'e44',
        type: 'Social Media Analytics',
        description: 'Declining engagement stats',
        location: 'TikTok Analytics',
        timestamp: '2026-03-20 00:00:00',
        relatedTo: ['s11'],
        content: 'Youssef\'s views down 67% in past month. Last post caption: "You guys want more pranks?? Comment if yes! I need the motivation! 🙏"'
      },
      {
        id: 'e45',
        type: 'Witness Statement',
        description: 'Neighbor saw running man',
        location: 'Police Statement',
        timestamp: '2026-03-25 21:00:00',
        relatedTo: ['s11'],
        content: 'Neighbor: "I saw a guy in a hoodie sprinting away laughing. He kept saying \'That was perfect!\' and looking at his phone."'
      },
      {
        id: 'e46',
        type: 'Browser History',
        description: 'Research on viral pranks',
        location: 'Computer Forensics',
        timestamp: '2026-03-25 18:30:00',
        relatedTo: ['s11'],
        content: 'Search history: "best ding dong ditch reactions", "how to go viral 2026", "luxury villa pranks", "comeback strategy for content creators"'
      },
      {
        id: 'e47',
        type: 'Text Message',
        description: 'Planning message to friend',
        location: 'Phone Records',
        timestamp: '2026-03-25 19:15:00',
        relatedTo: ['s11'],
        content: 'Text: "Bro I found the PERFECT villa for tonight\'s prank. Rich neighborhood = better reactions = viral content! Meet me at 8:30!"'
      },
      {
        id: 'e48',
        type: 'Previous Pranks',
        description: 'History of similar videos',
        location: 'TikTok Archive',
        timestamp: '2025-01-01 to 2026-03-01',
        relatedTo: ['s11'],
        content: '47 previous prank videos including 12 doorbell pranks. Pattern shows escalation to wealthier neighborhoods over time.'
      },
      {
        id: 'e49',
        type: 'Clothing Match',
        description: 'Hoodie found in car',
        location: 'Vehicle Search',
        timestamp: '2026-03-26 10:00:00',
        relatedTo: ['s11'],
        content: 'Black hoodie with "Subscribe!" text found in Youssef\'s car. Matches doorbell camera footage exactly.'
      },
      {
        id: 'e50',
        type: 'Victim Statement',
        description: 'Homeowner interview',
        location: 'Police Statement',
        timestamp: '2026-03-25 21:30:00',
        relatedTo: [],
        content: 'Homeowner: "I rushed to the door expecting a delivery. Nothing. Just... emptiness. The psychological trauma is immense."'
      }
    ],
    locations: [
      {
        id: 'l7',
        name: 'Villa #234, Palm Jumeirah',
        type: 'Crime Scene',
        address: 'Palm Jumeirah Frond K, Dubai',
        description: 'Luxury villa where doorbell was viciously rung without legitimate purpose',
        lastActivity: '2026-03-25 20:47:00 - Doorbell ring and flee'
      },
      {
        id: 'l8',
        name: 'Youssef\'s Apartment',
        type: 'Suspect Location',
        address: 'Al Ain Downtown',
        description: 'Content creator\'s residence where evidence was discovered',
        lastActivity: '2026-03-26 10:00:00 - Search warrant executed'
      }
    ],
    solution: {
      who: 'Youssef Ibrahim',
      why: 'Desperate TikTok prankster whose views have plummeted 67%. Needed viral content for his "comeback series" and thought wealthy villa prank would get views.',
      how: 'Drove to Palm Jumeirah at 20:30, approached Villa #234 at 20:47, pressed doorbell while filming selfie-style, ran away giggling. Saved video as draft but got caught.'
    }
  },
  {
    id: 'case-005',
    title: 'The Dubai Mall Ice Cream Spillage Scandal',
    description: 'CATASTROPHE ALERT! Someone dropped their ice cream cone on the pristine Dubai Mall floor and just... WALKED AWAY! This floor was cleaned only 3 hours ago!',
    briefing: 'Detective, mobilize all units! At approximately 15:23, a double-scoop pistachio ice cream cone was dropped near the fountain at Dubai Mall and the perpetrator fled without cleaning it! We have a 6-inch diameter sticky situation!',
    difficulty: 1,
    culprit: 'Marcus Chen',
    type: 'Littering',
    location: 'Dubai Mall',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-memories.mp3',
    suspects: [
      {
        id: 's16',
        name: 'Marcus Chen',
        age: 42,
        occupation: 'Clumsy Tourist',
        location: 'Hotel Tourist',
        alibi: 'Claims he was shopping in another section',
        motive: 'Embarrassed about dropping ice cream',
        background: 'Has dropped food 14 times this week according to hotel staff',
        eyeColor: 'Brown',
        height: 178,
        weight: 82,
        dateJoined: '2024-11-20',
        dateOfBirth: '1984-07-22'
      },
      {
        id: 's17',
        name: 'Sarah Johnson',
        age: 28,
        occupation: 'Mall Employee',
        location: 'Dubai Marina',
        alibi: 'Working at customer service desk',
        background: 'Professional cleaner, hates messes',
        eyeColor: 'Blue',
        height: 168,
        weight: 61,
        dateJoined: '2022-04-10',
        dateOfBirth: '1998-08-15'
      },
      {
        id: 's18',
        name: 'Ahmed Ali',
        age: 9,
        occupation: 'Student',
        location: 'Deira',
        alibi: 'With parents at toy store',
        background: 'Child who loves ice cream, known to be careful eater',
        eyeColor: 'Brown',
        height: 135,
        weight: 32,
        dateJoined: '2024-01-05',
        dateOfBirth: '2017-05-20'
      }
    ],
    evidence: [
      {
        id: 'e51',
        type: 'Security Footage',
        description: 'Man drops ice cream and runs',
        location: 'Dubai Mall Fountain Area',
        timestamp: '2026-03-25 15:23:00',
        relatedTo: ['s16'],
        content: 'Video shows tourist in cargo shorts dropping ice cream, looking around nervously, then speed-walking away while whistling innocently.'
      },
      {
        id: 'e52',
        type: 'Purchase Receipt',
        description: 'Ice cream shop transaction',
        location: 'Gelato Perfetto',
        timestamp: '2026-03-25 15:18:00',
        relatedTo: ['s16'],
        content: 'Credit card receipt: Marcus Chen purchased "Double Pistachio Cone" for 35 AED at 15:18. Exactly 5 minutes before incident.'
      },
      {
        id: 'e53',
        type: 'Hotel Incident Log',
        description: 'Pattern of food dropping',
        location: 'Hotel Records',
        timestamp: '2026-03-20 to 2026-03-25',
        relatedTo: ['s16'],
        content: 'Hotel staff report: Marcus has dropped: 3 coffees, 2 sandwiches, 1 plate of pasta, 4 drinks, 2 desserts, and 2 bags of chips in past 5 days.'
      },
      {
        id: 'e54',
        type: 'Witness Statement',
        description: 'Child saw everything',
        location: 'Mall Security Office',
        timestamp: '2026-03-25 15:45:00',
        relatedTo: ['s16'],
        content: 'Ahmed (age 9): "The tall uncle with the camera dropped his ice cream and just left! Mama says we always clean up after ourselves!"'
      },
      {
        id: 'e55',
        type: 'Sticky Footprints',
        description: 'Ice cream trail',
        location: 'Mall Floor',
        timestamp: '2026-03-25 15:24:00',
        relatedTo: ['s16'],
        content: 'Forensics found pistachio ice cream footprints leading away from scene. Shoe size matches Marcus Chen exactly (US 11).'
      }
    ],
    locations: [
      {
        id: 'l9',
        name: 'Dubai Mall Fountain Area',
        type: 'Crime Scene',
        address: 'Ground Floor, Dubai Mall',
        description: 'Prestigious location now marked by 6-inch ice cream stain',
        lastActivity: '2026-03-25 15:23:00 - Ice cream dropped and abandoned'
      }
    ],
    solution: {
      who: 'Marcus Chen',
      why: 'Extremely clumsy tourist who was too embarrassed to clean up his mess in public. Has pattern of food-dropping incidents.',
      how: 'Bought pistachio ice cream at 15:18, dropped it at 15:23 while taking selfie with fountain, panicked due to embarrassment, speed-walked away pretending nothing happened.'
    }
  },
  {
    id: 'case-006',
    title: 'The Marina Walk Pigeon Feeding Fiasco',
    description: 'ILLEGAL FEEDING ALERT! Someone has been feeding pigeons at Dubai Marina against city regulations! Dozens of birds now congregating! THIS IS NOT A DRILL!',
    briefing: 'Detective, we have a serious wildlife disruption. An individual has been spotted feeding pigeons bread crumbs daily at Marina Walk despite clear "Do Not Feed Birds" signage. The pigeon population has DOUBLED in one week!',
    difficulty: 2,
    culprit: 'Fatima Al-Zaabi',
    type: 'Illegal Bird Feeding',
    location: 'Dubai Marina',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-inspire.mp3',
    suspects: [
      {
        id: 's19',
        name: 'Fatima Al-Zaabi',
        age: 29,
        occupation: 'Animal Lover',
        location: 'Jumeirah',
        alibi: 'Morning walks for exercise',
        motive: 'Thinks pigeons look hungry',
        background: 'Has 4 cats, 2 dogs, and fish tank. Can\'t resist feeding animals.',
        eyeColor: 'Green',
        height: 170,
        weight: 62,
        dateJoined: '2025-03-01',
        dateOfBirth: '1997-11-08'
      },
      {
        id: 's20',
        name: 'Robert Smith',
        age: 67,
        occupation: 'Retired Accountant',
        location: 'Dubai Marina',
        alibi: 'Sitting on bench reading newspaper',
        background: 'Hates birds, complains about them constantly',
        eyeColor: 'Gray',
        height: 173,
        weight: 79,
        dateJoined: '2020-11-15',
        dateOfBirth: '1959-06-12'
      },
      {
        id: 's21',
        name: 'Wei Zhang',
        age: 35,
        occupation: 'Photographer',
        location: 'JBR',
        alibi: 'Taking photos of architecture',
        background: 'Photographs birds but doesn\'t interact with them',
        eyeColor: 'Brown',
        height: 171,
        weight: 68,
        dateJoined: '2023-02-20',
        dateOfBirth: '1991-10-05'
      }
    ],
    evidence: [
      {
        id: 'e61',
        type: 'Security Footage',
        description: 'Woman throwing bread to pigeons',
        location: 'Marina Walk',
        timestamp: '2026-03-25 07:15:00',
        relatedTo: ['s19'],
        content: 'Camera shows woman in green jacket scattering bread crumbs while surrounded by 30+ pigeons. She\'s smiling and talking to them.'
      },
      {
        id: 'e62',
        type: 'Witness Statement',
        description: 'Daily routine observed',
        location: 'Police Statement',
        timestamp: '2026-03-26 09:00:00',
        relatedTo: ['s19'],
        content: 'Coffee shop worker: "That lady comes every morning at 7:15 with a bag of bread. The pigeons recognize her now. They follow her!"'
      },
      {
        id: 'e63',
        type: 'Social Media',
        description: 'Instagram posts of pigeons',
        location: 'Instagram Account',
        timestamp: '2026-03-20 to 2026-03-25',
        relatedTo: ['s19'],
        content: 'Fatima\'s account shows 17 photos of pigeons captioned "My morning friends 🕊️❤️" and "They wait for me every day! So sweet!"'
      },
      {
        id: 'e64',
        type: 'Bread Receipt',
        description: 'Bulk bread purchase',
        location: 'Supermarket',
        timestamp: '2026-03-24 16:00:00',
        relatedTo: ['s19'],
        content: 'Fatima purchased 12 loaves of bread. Cashier noted: "She said it\'s for feeding... her friends at the marina."'
      },
      {
        id: 'e65',
        type: 'Bird Population Study',
        description: 'Marina pigeon count',
        location: 'Environmental Department',
        timestamp: '2026-03-15 to 2026-03-25',
        relatedTo: ['s19'],
        content: 'Official count: Pigeon population increased from 23 birds to 51 birds in 10 days. All congregate in specific area at 7:15 AM daily.'
      }
    ],
    locations: [
      {
        id: 'l10',
        name: 'Dubai Marina Walk Feeding Zone',
        type: 'Crime Scene',
        address: 'Marina Walk, Dubai Marina',
        description: 'Location where illegal pigeon feeding occurs daily. Multiple "Do Not Feed Birds" signs present.',
        lastActivity: '2026-03-25 07:15:00 - Feeding incident'
      }
    ],
    solution: {
      who: 'Fatima Al-Zaabi',
      why: 'Animal lover who thinks the pigeons look hungry and lonely. Ignores regulations because she believes animals need her help.',
      how: 'Arrives at Marina Walk every morning at 7:15 AM with bread, feeds pigeons despite signage. Has been doing this for 10+ days, causing pigeon population to double.'
    }
  },
  {
    id: 'case-007',
    title: 'The JBR Beach Sandcastle Destruction',
    description: 'VANDALISM EMERGENCY! A child\'s carefully constructed sandcastle at JBR Beach was deliberately STEPPED ON! Hours of work destroyed in seconds!',
    briefing: 'Detective, this is devastating. Young Mariam spent 3 hours building an elaborate sandcastle with towers and moat. At 17:42, an adult deliberately stepped on it. We need justice for this heinous act of sandcastle destruction!',
    difficulty: 1,
    culprit: 'Viktor Sokolov',
    type: 'Sandcastle Vandalism',
    location: 'JBR Beach',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-memories.mp3',
    suspects: [
      {
        id: 's22',
        name: 'Viktor Sokolov',
        age: 51,
        occupation: 'Grumpy Business Executive',
        location: 'Palm Jumeirah',
        alibi: 'Walking on beach for exercise',
        motive: 'Hates noise, was annoyed by children playing',
        background: 'Known to complain about everything, filed 89 noise complaints',
        eyeColor: 'Blue',
        height: 183,
        weight: 91,
        dateJoined: '2023-05-10',
        dateOfBirth: '1975-02-14'
      },
      {
        id: 's23',
        name: 'Linda Martinez',
        age: 33,
        occupation: 'Beach Lifeguard',
        location: 'JBR',
        alibi: 'On duty at lifeguard tower',
        background: 'Loves children, encourages beach creativity',
        eyeColor: 'Brown',
        height: 172,
        weight: 64,
        dateJoined: '2021-06-01',
        dateOfBirth: '1993-03-17'
      },
      {
        id: 's24',
        name: 'Omar Hassan',
        age: 11,
        occupation: 'Student',
        location: 'Deira',
        alibi: 'Building his own sandcastle nearby',
        background: 'Friend of victim, was helping with construction',
        eyeColor: 'Brown',
        height: 145,
        weight: 38,
        dateJoined: '2024-03-10',
        dateOfBirth: '2015-07-22'
      }
    ],
    evidence: [
      {
        id: 'e71',
        type: 'Security Footage',
        description: 'Man deliberately steps on sandcastle',
        location: 'JBR Beach Camera 7',
        timestamp: '2026-03-25 17:42:00',
        relatedTo: ['s22'],
        content: 'Video clearly shows man in business clothes walking on beach, sees sandcastle, deliberately changes path to step directly on it, continues walking.'
      },
      {
        id: 'e72',
        type: 'Witness Statement',
        description: 'Child victim testimony',
        location: 'Police Statement',
        timestamp: '2026-03-25 18:00:00',
        relatedTo: ['s22'],
        content: 'Mariam (age 8) crying: "The mean man in the suit looked at my castle and stomped on it! He didn\'t even say sorry! My towers! 😭"'
      },
      {
        id: 'e73',
        type: 'Complaint History',
        description: 'Viktor\'s complaint record',
        location: 'Municipality Records',
        timestamp: '2024-2026',
        relatedTo: ['s22'],
        content: 'Viktor has filed 89 complaints in 2 years: Noise complaints (47), children playing too loudly (23), beach volleyball too close to him (11), other (8).'
      },
      {
        id: 'e74',
        type: 'Footprint Analysis',
        description: 'Shoe print in destroyed sandcastle',
        location: 'Forensics Lab',
        timestamp: '2026-03-25 18:30:00',
        relatedTo: ['s22'],
        content: 'Designer Italian dress shoe print found in sandcastle ruins. Size 44 EUR. Matches Viktor\'s expensive Ferragamo shoes exactly.'
      },
      {
        id: 'e75',
        type: 'Phone Call Recording',
        description: 'Viktor complaining to friend',
        location: 'Phone Records',
        timestamp: '2026-03-25 17:50:00',
        relatedTo: ['s22'],
        content: 'Viktor to friend: "These children and their noise! I showed them! Stepped right on their little sand pile. Peace and quiet restored!"'
      }
    ],
    locations: [
      {
        id: 'l11',
        name: 'JBR Beach Section 7',
        type: 'Crime Scene',
        address: 'Jumeirah Beach Residence, Dubai',
        description: 'Beach location where elaborate sandcastle was destroyed',
        lastActivity: '2026-03-25 17:42:00 - Sandcastle destroyed'
      }
    ],
    solution: {
      who: 'Viktor Sokolov',
      why: 'Grumpy executive annoyed by children playing and laughing near "his" section of beach. Wanted to teach them a lesson about making noise.',
      how: 'Deliberately walked toward sandcastle at 17:42, stepped directly on it with expensive Italian shoes, continued walking without apology. Bragged about it to friend minutes later.'
    }
  },
  {
    id: 'case-008',
    title: 'The Gold Souk Shopping Bag Switcharoo',
    description: 'BAG MIX-UP MAYHEM! Someone accidentally (or was it?!) switched identical shopping bags at Dubai Gold Souk. One bag had gold jewelry, the other had... dates!',
    briefing: 'Detective, we have a complex case! Mrs. Al-Mansoori left Gold Souk with a bag of dates instead of her gold jewelry purchase worth 15,000 AED. The jewelry bag is now missing. Was this an accident or calculated theft?',
    difficulty: 3,
    culprit: 'Youssef Ibrahim',
    type: 'Shopping Bag Switch',
    location: 'Gold Souk',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-creativemode.mp3',
    suspects: [
      {
        id: 's25',
        name: 'Youssef Ibrahim',
        age: 44,
        occupation: 'Professional Shopper',
        location: 'Al Ain',
        alibi: 'Shopping for family gifts',
        motive: 'Saw expensive jewelry, opportunistic switch',
        background: 'Skilled in distraction techniques, has identical shopping bags',
        eyeColor: 'Brown',
        height: 176,
        weight: 72,
        dateJoined: '2015-06-01',
        dateOfBirth: '1982-09-14'
      },
      {
        id: 's26',
        name: 'Priya Sharma',
        age: 38,
        occupation: 'Tourist',
        location: 'Tourist Hotel',
        alibi: 'Shopping for souvenirs',
        background: 'First time in Dubai, confused by everything',
        eyeColor: 'Brown',
        height: 163,
        weight: 57,
        dateJoined: '2026-03-20',
        dateOfBirth: '1988-09-30'
      },
      {
        id: 's27',
        name: 'Mohammed Al-Rashid',
        age: 55,
        occupation: 'Date Seller',
        location: 'Deira',
        alibi: 'Working at his date shop',
        background: 'Honest merchant for 30 years, uses identical bags',
        eyeColor: 'Brown',
        height: 174,
        weight: 83,
        dateJoined: '1996-04-10',
        dateOfBirth: '1971-11-15'
      }
    ],
    evidence: [
      {
        id: 'e81',
        type: 'Security Footage',
        description: 'Suspicious bag placement',
        location: 'Gold Souk Corridor',
        timestamp: '2026-03-25 14:23:00',
        relatedTo: ['s25'],
        content: 'Video shows Youssef placing his bag next to Mrs. Al-Mansoori\'s bag, creating confusion, then picking up wrong bag "accidentally."'
      },
      {
        id: 'e82',
        type: 'Purchase Records',
        description: 'No gold purchase by Youssef',
        location: 'Souk Transaction Database',
        timestamp: '2026-03-25 14:00:00',
        relatedTo: ['s25'],
        content: 'Records show Youssef purchased dates only, but left with bag from jewelry shop. No jewelry purchase on his name.'
      },
      {
        id: 'e83',
        type: 'Witness Statement',
        description: 'Shop owner saw the switch',
        location: 'Police Statement',
        timestamp: '2026-03-25 16:00:00',
        relatedTo: ['s25'],
        content: 'Date shop owner: "That man bought 2kg dates from me. But I saw him later carrying gold shop bag. Same man, different bag!"'
      },
      {
        id: 'e84',
        type: 'Bag Forensics',
        description: 'Fingerprints on both bags',
        location: 'Forensics Lab',
        timestamp: '2026-03-26 10:00:00',
        relatedTo: ['s25'],
        content: 'Youssef\'s fingerprints found on both the date bag AND the jewelry bag. Mrs. Al-Mansoori\'s prints only on jewelry bag (now with dates).'
      },
      {
        id: 'e85',
        type: 'Phone GPS',
        description: 'Youssef\'s movements',
        location: 'GPS Tracking',
        timestamp: '2026-03-25 14:20:00',
        relatedTo: ['s25'],
        content: 'GPS shows Youssef lingered near jewelry shop for 12 minutes despite only buying dates. Waited for busy moment.'
      },
      {
        id: 'e86',
        type: 'Previous Incidents',
        description: 'Similar bag switches reported',
        location: 'Police Database',
        timestamp: '2025-2026',
        relatedTo: ['s25'],
        content: '3 similar "accidental" bag switches reported in past year. Youssef was present in shopping area during all incidents. No charges filed due to lack of evidence.'
      }
    ],
    locations: [
      {
        id: 'l12',
        name: 'Gold Souk Corridor',
        type: 'Crime Scene',
        address: 'Deira Gold Souk, Dubai',
        description: 'Busy shopping area where bag switch occurred',
        lastActivity: '2026-03-25 14:23:00 - Bag switch'
      }
    ],
    solution: {
      who: 'Youssef Ibrahim',
      why: 'Opportunistic thief who uses identical shopping bags to switch with expensive purchases. Operates in crowded areas.',
      how: 'Bought dates, carried bag to jewelry shop area, placed his date bag next to Mrs. Al-Mansoori\'s jewelry bag during busy moment at 14:23, grabbed jewelry bag and left. Has done this before.'
    }
  },
  {
    id: 'case-009',
    title: 'The Emirates Palace Tissue Theft',
    description: 'LUXURY HOTEL SCANDAL! Someone took extra tissues from the Emirates Palace bathroom! THREE tissues when they only needed TWO! This is tissue waste on an unprecedented scale!',
    briefing: 'Detective, Emirates Palace maintains the highest standards. At 11:47 AM, bathroom attendant noticed 3 tissues missing from the dispenser, but waste bin only contained 2. One tissue is unaccounted for! Find this tissue thief!',
    difficulty: 2,
    culprit: 'Dr. Omar Khalil',
    type: 'Tissue Theft',
    location: 'Emirates Palace',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-inspire.mp3',
    suspects: [
      {
        id: 's28',
        name: 'Dr. Omar Khalil',
        age: 58,
        occupation: 'Conference Attendee',
        location: 'Al Reem Island',
        alibi: 'Attending medical conference',
        motive: 'Has allergies, pockets tissues "just in case"',
        background: 'Chronic tissue hoarder due to severe allergies',
        eyeColor: 'Brown',
        height: 172,
        weight: 76,
        dateJoined: '2010-03-15',
        dateOfBirth: '1968-05-22'
      },
      {
        id: 's29',
        name: 'Samantha Lee',
        age: 41,
        occupation: 'Bathroom Attendant',
        location: 'Abu Dhabi',
        alibi: 'On duty maintaining cleanliness',
        background: 'Obsessed with tissue count accuracy, takes pride in work',
        eyeColor: 'Brown',
        height: 167,
        weight: 60,
        dateJoined: '2018-07-20',
        dateOfBirth: '1985-12-08'
      },
      {
        id: 's30',
        name: 'Abdullah Mahmoud',
        age: 35,
        occupation: 'Business Guest',
        location: 'Al Ain',
        alibi: 'Meeting clients in lobby',
        background: 'Uses handkerchiefs, never tissues',
        eyeColor: 'Brown',
        height: 179,
        weight: 77,
        dateJoined: '2022-03-15',
        dateOfBirth: '1991-06-25'
      }
    ],
    evidence: [
      {
        id: 'e91',
        type: 'Security Footage',
        description: 'Man taking tissues and pocketing one',
        location: 'Emirates Palace Bathroom Corridor',
        timestamp: '2026-03-25 11:47:00',
        relatedTo: ['s28'],
        content: 'Camera shows Dr. Khalil taking 3 tissues, using 2 to dry hands, glancing around nervously, then pocketing the third tissue.'
      },
      {
        id: 'e92',
        type: 'Tissue Dispenser Log',
        description: 'Exact count discrepancy',
        location: 'Hotel Maintenance Records',
        timestamp: '2026-03-25 11:50:00',
        relatedTo: ['s28'],
        content: 'Attendant log: "Dispenser count reduced by 3. Waste bin count: 2. Discrepancy: 1 tissue. Suspect: Male, 50s, gray hair, conference badge."'
      },
      {
        id: 'e93',
        type: 'Conference Badge Scan',
        description: 'Dr. Khalil bathroom entry',
        location: 'Access Control System',
        timestamp: '2026-03-25 11:46:00',
        relatedTo: ['s28'],
        content: 'Badge scan shows Dr. Omar Khalil entered bathroom area at 11:46, exited at 11:48. Only person in bathroom during tissue incident window.'
      },
      {
        id: 'e94',
        type: 'Pocket Search',
        description: 'Tissue found in jacket',
        location: 'Security Inspection',
        timestamp: '2026-03-25 14:00:00',
        relatedTo: ['s28'],
        content: 'Emirates Palace luxury tissue found in Dr. Khalil\'s jacket pocket. Tissue matches bathroom dispenser exactly. Still folded, unused.'
      },
      {
        id: 'e95',
        type: 'Medical Records',
        description: 'Chronic allergy sufferer',
        location: 'Hospital Database',
        timestamp: '2020-2026',
        relatedTo: ['s28'],
        content: 'Dr. Khalil treated for severe seasonal allergies. Doctor\'s note: "Patient reports carrying tissues at all times due to unpredictable sneezing episodes."'
      },
      {
        id: 'e96',
        type: 'Hotel Records',
        description: 'Pattern of tissue taking',
        location: 'Previous Visits Log',
        timestamp: '2024-2026',
        relatedTo: ['s28'],
        content: 'Review of past visits: Tissue discrepancies noted during 7 of Dr. Khalil\'s 12 previous stays at Emirates Palace. Always exactly 1 tissue missing.'
      }
    ],
    locations: [
      {
        id: 'l13',
        name: 'Emirates Palace Men\'s Bathroom',
        type: 'Crime Scene',
        address: 'Emirates Palace, Abu Dhabi',
        description: 'Luxury bathroom facility where tissue theft occurred',
        lastActivity: '2026-03-25 11:47:00 - Tissue taken'
      }
    ],
    solution: {
      who: 'Dr. Omar Khalil',
      why: 'Chronic allergy sufferer who habitually pockets tissues "just in case" he needs them later. Has severe allergies and fears being caught without tissues.',
      how: 'Entered bathroom at 11:46, took 3 tissues from dispenser, used 2 to dry hands, nervously pocketed the third at 11:47 for emergency allergy use. Has done this 7 times before.'
    }
  },
  {
    id: 'case-010',
    title: 'The Sharjah Library Book Overdue Crisis',
    description: 'LIBRARY EMERGENCY! A library book is 3 DAYS OVERDUE! "Introduction to Origami" was due March 22nd but remains unreturned. The library system is in chaos!',
    briefing: 'Detective, this is our most serious case. A patron borrowed "Introduction to Origami" on March 1st with a March 22nd due date. It is now March 25th! 3 days overdue! Find this book and bring the overdue patron to justice! Late fees: 3 AED!',
    difficulty: 3,
    culprit: 'Noor Al-Hashimi',
    type: 'Overdue Library Book',
    location: 'Sharjah Library',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-creativemode.mp3',
    suspects: [
      {
        id: 's31',
        name: 'Noor Al-Hashimi',
        age: 29,
        occupation: 'Art Teacher',
        location: 'Sharjah',
        alibi: 'Busy preparing for school art exhibition',
        motive: 'Forgot due date while practicing origami swans for students',
        background: 'Has 47 library books at home, loves reading but terrible with deadlines',
        eyeColor: 'Brown',
        height: 170,
        weight: 64,
        dateJoined: '2021-09-01',
        dateOfBirth: '1997-07-11'
      },
      {
        id: 's32',
        name: 'Hassan Ibrahim',
        age: 65,
        occupation: 'Retired Librarian',
        location: 'Sharjah',
        alibi: 'At home reading',
        background: 'Would NEVER have overdue book, library is sacred to him',
        eyeColor: 'Brown',
        height: 171,
        weight: 74,
        dateJoined: '1985-02-10',
        dateOfBirth: '1961-04-18'
      },
      {
        id: 's33',
        name: 'Emily Watson',
        age: 22,
        occupation: 'University Student',
        location: 'University City',
        alibi: 'Studying for exams',
        background: 'Has never borrowed book from this library, not registered',
        eyeColor: 'Blue',
        height: 168,
        weight: 59,
        dateJoined: '2023-09-01',
        dateOfBirth: '2004-02-14'
      },
      {
        id: 's34',
        name: 'Karim Al-Said',
        age: 19,
        occupation: 'High School Student',
        location: 'Al Nahda',
        alibi: 'Returned all books on time',
        background: 'Perfect library record, returns books early',
        eyeColor: 'Brown',
        height: 176,
        weight: 68,
        dateJoined: '2024-01-15',
        dateOfBirth: '2007-08-20'
      }
    ],
    evidence: [
      {
        id: 'e101',
        type: 'Library Database',
        description: 'Book checkout record',
        location: 'Library System',
        timestamp: '2026-03-01 10:23:00',
        relatedTo: ['s31'],
        content: 'Book: "Introduction to Origami" (Call #: 736.982). Checked out: March 1, 10:23 AM. Borrower: Noor Al-Hashimi (Card #1847). Due date: March 22, 2026. Status: 3 DAYS OVERDUE!'
      },
      {
        id: 'e102',
        type: 'Automated Reminders',
        description: 'Overdue notices sent',
        location: 'Email Server',
        timestamp: '2026-03-23 to 2026-03-25',
        relatedTo: ['s31'],
        content: '3 overdue notices sent to noor.alhashimi@email.ae. Subject: "URGENT: Overdue Library Book". All marked as read but not responded to.'
      },
      {
        id: 'e103',
        type: 'Social Media',
        description: 'Instagram post with origami',
        location: 'Instagram',
        timestamp: '2026-03-24 19:30:00',
        relatedTo: ['s31'],
        content: 'Noor posted: "Finally mastered the paper crane! 🦢 Teaching my students tomorrow! #origami #artteacher" Photo shows library book visible in background!'
      },
      {
        id: 'e104',
        type: 'School Records',
        description: 'Art exhibition preparation',
        location: 'School Administration',
        timestamp: '2026-03-20 to 2026-03-25',
        relatedTo: ['s31'],
        content: 'Noor preparing major art exhibition requiring 100 origami swans. Colleagues report: "She\'s been obsessed with origami all week, forgets everything else."'
      },
      {
        id: 'e105',
        type: 'Phone Call',
        description: 'Library called Noor',
        location: 'Phone Records',
        timestamp: '2026-03-25 11:00:00',
        relatedTo: ['s31'],
        content: 'Library call to Noor. Conversation: "Oh no! I completely forgot! I\'m so sorry! I\'ll bring it today! The book is on my coffee table under 73 paper swans!"'
      },
      {
        id: 'e106',
        type: 'Previous Overdue History',
        description: 'Pattern of late returns',
        location: 'Library Database',
        timestamp: '2022-2026',
        relatedTo: ['s31'],
        content: 'Noor\'s library record: 127 books borrowed. 23 returned late (18%). Average delay: 4.7 days. Accumulated late fees: 67 AED. Pattern: Always apologetic, always forgets.'
      },
      {
        id: 'e107',
        type: 'Home Visit',
        description: 'Book found at residence',
        location: 'Noor\'s Apartment',
        timestamp: '2026-03-25 15:00:00',
        relatedTo: ['s31'],
        content: 'Library staff visit confirmed: "Introduction to Origami" found on coffee table, exactly as described, buried under paper swans. Book in good condition.'
      },
      {
        id: 'e108',
        type: 'Calendar Check',
        description: 'Due date reminder set but ignored',
        location: 'Noor\'s Phone',
        timestamp: '2026-03-22 09:00:00',
        relatedTo: ['s31'],
        content: 'Phone calendar alarm "Return library book!" set for March 22 at 9 AM. Notification dismissed with "remind me later." Never completed.'
      }
    ],
    locations: [
      {
        id: 'l14',
        name: 'Sharjah Public Library',
        type: 'Library',
        address: 'Al Rolla Street, Sharjah',
        description: 'Where book was originally borrowed from. Waiting for return.',
        lastActivity: '2026-03-25 11:00:00 - Called borrower'
      },
      {
        id: 'l15',
        name: 'Noor\'s Apartment',
        type: 'Evidence Location',
        address: 'Al Nahda, Sharjah',
        description: 'Where overdue book is currently located, under paper swans',
        lastActivity: '2026-03-25 15:00:00 - Book located'
      }
    ],
    solution: {
      who: 'Noor Al-Hashimi',
      why: 'Art teacher got so absorbed in practicing origami for her students\' exhibition that she completely forgot the library due date despite multiple reminders.',
      how: 'Borrowed book on March 1st, became obsessed with perfecting origami swans for school exhibition, ignored 3 email reminders and 1 phone calendar alarm. Book sat on coffee table under 73 paper swans while being 3 days overdue. Has history of 23 late returns (18% of all borrowings).'
    }
  },
  {
    id: 'case-011',
    title: 'The Midnight Brine',
    description: 'ENVIRONMENTAL CRISIS! Massive die-off of juvenile hammour fish and mangrove saplings detected in Eastern Mangrove National Park Sector 4. Water tests show extreme spikes in salinity and heavy metal toxicity consistent with industrial desalination brine dumping.',
    briefing: 'Good morning, Inspector. The Environment Agency - Abu Dhabi (EAD) has detected a massive localized die-off of juvenile hammour fish and mangrove saplings in Sector 4 of the Eastern Mangroves. The ecological damage is severe. Water tests show extreme, localized spikes in salinity and heavy metal toxicity, consistent with industrial desalination brine. None of the nearby coastal industrial plants have reported accidental spills. We suspect a corporation is bypassing disposal fees by secretly dumping toxic brine directly into the protected waters under the cover of darkness. You have access to the city\'s IoT water sensors, maritime AIS (tracking) logs, and municipal waste disposal manifests. Find the culprit.',
    difficulty: 3,
    culprit: 'C-42',
    type: 'Corporate Marine Pollution',
    location: 'Eastern Mangrove National Park, Abu Dhabi',
    audioBriefingUrl: 'https://www.bensound.com/bensound-music/bensound-creativemode.mp3',
    suspects: [
      {
        id: 's35',
        name: 'Rashid Al-Nahyan',
        age: 52,
        occupation: 'CEO - Oasis Pure Desalination',
        location: 'Abu Dhabi',
        alibi: 'Claims company follows all regulations',
        motive: 'Save millions in disposal fees',
        background: 'Runs C-42 Oasis Pure Desalination. Under pressure from board to cut operational costs. Company produces 50,000 tons of brine monthly.',
        eyeColor: 'Brown',
        height: 178,
        weight: 85,
        dateJoined: '2010-03-15',
        dateOfBirth: '1974-06-12'
      },
      {
        id: 's36',
        name: 'Captain Hassan Mahmoud',
        age: 45,
        occupation: 'Vessel Captain - Liquidator VII',
        location: 'Abu Dhabi Marina',
        alibi: 'Following company orders',
        background: 'Captain of vessel V-889 (Liquidator VII), liquid waste barge owned by C-42. Experienced mariner, knows how to disable AIS transponders.',
        eyeColor: 'Brown',
        height: 182,
        weight: 92,
        dateJoined: '2015-07-20',
        dateOfBirth: '1981-09-15'
      },
      {
        id: 's37',
        name: 'Fatima Al-Dosari',
        age: 38,
        occupation: 'Environmental Manager - Al Bateen Leisure',
        location: 'Abu Dhabi',
        alibi: 'Vessel was on legitimate cruise',
        background: 'Works for C-09 Al Bateen Leisure, owner of Desert Rose luxury yacht. Company has spotless environmental record.',
        eyeColor: 'Brown',
        height: 165,
        weight: 58,
        dateJoined: '2018-04-10',
        dateOfBirth: '1988-11-22'
      },
      {
        id: 's38',
        name: 'Omar Khalifa',
        age: 48,
        occupation: 'Operations Director - Najm Petrochemicals',
        location: 'Industrial Zone',
        alibi: 'Company properly disposes all waste',
        background: 'Works for C-77 Najm Petrochemicals. Company has consistent disposal records and produces chemical waste, not brine.',
        eyeColor: 'Brown',
        height: 175,
        weight: 88,
        dateJoined: '2012-02-01',
        dateOfBirth: '1978-05-30'
      }
    ],
    evidence: [
      {
        id: 'e110',
        type: 'Water Quality Alert',
        description: 'IoT sensor data showing massive pollution spike',
        location: 'Sector 4, Eastern Mangroves',
        timestamp: '2026-04-07 02:00:00',
        relatedTo: ['s35', 's36'],
        content: 'Sensor M-04 in Sector 4 detected catastrophic spike: salinity jumped from 42.0 ppt to 88.5 ppt at 02:00. pH dropped from 8.0 to 6.2 (acidic). Normal mangrove water: 35-45 ppt salinity, 7.5-8.5 pH. This is consistent with concentrated desalination brine discharge.'
      },
      {
        id: 'e111',
        type: 'Maritime AIS Tracking',
        description: 'Vessel tracking anomaly',
        location: 'Maritime Database',
        timestamp: '2026-04-07 01:45:00',
        relatedTo: ['s35', 's36'],
        content: 'CRITICAL: Vessel V-889 (Liquidator VII) anchored in Sector 4 at 01:35. At 01:45, AIS transponder went OFFLINE (status: UNKNOWN). Transponder reactivated at 02:45. The 60-minute blackout coincides exactly with pollution spike window. By UAE law, AIS must remain on at all times.'
      },
      {
        id: 'e112',
        type: 'Vessel Registry Cross-Reference',
        description: 'Ownership of suspicious vessel',
        location: 'RTA Maritime Division',
        timestamp: '2026-04-07 09:00:00',
        relatedTo: ['s35', 's36'],
        content: 'Vessel V-889 registered as "Liquidator VII", classified as Liquid Waste Barge, owned by company C-42. Cross-referencing company profiles reveals C-42 is "Oasis Pure Desalination" - a water utilities company producing 50,000 tons per month.'
      },
      {
        id: 'e113',
        type: 'Disposal Manifest Analysis',
        description: 'Suspicious drop in waste disposal',
        location: 'Al Dhafra Treatment Facility',
        timestamp: '2026-04-07 10:00:00',
        relatedTo: ['s35'],
        content: 'SMOKING GUN: Oasis Pure Desalination (C-42) produces 50,000 tons of brine monthly. March manifests show 48,000 tons properly disposed (96% compliance). April manifests show only 8,000 tons disposed (16% compliance). Where did the remaining 42,000 tons go? Disposal costs 100 AED per ton - they avoided paying 4.2 million AED in fees!'
      },
      {
        id: 'e114',
        type: 'EAD Ecological Assessment',
        description: 'Damage report',
        location: 'Environment Agency Abu Dhabi',
        timestamp: '2026-04-07 11:00:00',
        relatedTo: ['s35', 's36'],
        content: 'Sector 4 damage: 340 juvenile hammour fish dead, 67 mangrove saplings dying. Heavy metals detected: copper, nickel, chromium - all consistent with desalination brine concentrate. Recovery will take 2-3 years. Economic damage: 2.8 million AED.'
      },
      {
        id: 'e115',
        type: 'Financial Records',
        description: 'Cost-cutting pressure',
        location: 'Corporate Financial Database',
        timestamp: '2026-03-15 00:00:00',
        relatedTo: ['s35'],
        content: 'Board meeting minutes from C-42: "Q1 profits down 12%. CEO must reduce operational expenses by 15% or face replacement. Disposal fees represent our largest variable cost at 4.8M AED/month."'
      },
      {
        id: 'e116',
        type: 'Whistleblower Tip',
        description: 'Anonymous crew member report',
        location: 'Environmental Crimes Hotline',
        timestamp: '2026-04-07 08:00:00',
        relatedTo: ['s36'],
        content: 'Anonymous call: "I work on the Liquidator VII. Captain ordered AIS disabled last night. We dumped thousands of liters of brine into the mangroves around 2 AM. Boss said it\'s just salt water, nobody will notice. I can\'t sleep knowing what we did to those trees."'
      },
      {
        id: 'e117',
        type: 'Comparison Data',
        description: 'Other companies compliant',
        location: 'Municipal Waste Authority',
        timestamp: '2026-04-07 12:00:00',
        relatedTo: ['s38'],
        content: 'Cross-reference check: Najm Petrochemicals (C-77) disposed 12,100 tons in April vs 11,500 in March (normal variance). Al Bateen Leisure (C-09) and Oryx Marine (C-18) produce no industrial waste. Only C-42 shows massive disposal reduction.'
      },
      {
        id: 'e118',
        type: 'Sensor Timeline',
        description: 'Recovery pattern confirms single event',
        location: 'Water Quality Lab',
        timestamp: '2026-04-07 13:00:00',
        relatedTo: ['s35', 's36'],
        content: 'Sensor data shows dilution pattern: 88.5 ppt at 02:00, dropping to 75.0 at 02:30, 55.2 at 03:00. This indicates one massive dump event, not continuous pollution. Timing matches V-889 AIS blackout precisely.'
      }
    ],
    locations: [
      {
        id: 'l16',
        name: 'Eastern Mangrove National Park - Sector 4',
        type: 'Crime Scene',
        address: 'Eastern Mangroves, Abu Dhabi',
        description: 'Protected mangrove ecosystem, critical habitat for juvenile fish and migratory birds. Site of illegal brine dumping.',
        lastActivity: '2026-04-07 02:00:00 - Toxic brine discharge'
      },
      {
        id: 'l17',
        name: 'Oasis Pure Desalination Facility',
        type: 'Suspect Location',
        address: 'Taweelah, Abu Dhabi',
        description: 'Industrial desalination plant producing 50,000 tons of freshwater and brine monthly. Owner of V-889.',
        lastActivity: '2026-04-06 23:00:00 - Brine loaded onto Liquidator VII'
      },
      {
        id: 'l18',
        name: 'Al Dhafra Treatment Facility',
        type: 'Investigation Location',
        address: 'Al Dhafra, Abu Dhabi',
        description: 'Licensed hazardous waste disposal facility. Charges 100 AED per ton for brine treatment.',
        lastActivity: '2026-04-07 10:00:00 - Manifest audit conducted'
      }
    ],
    solution: {
      who: 'C-42 (Oasis Pure Desalination)',
      why: 'Company CEO under pressure from board to cut costs by 15%. Disposal fees of 4.8M AED/month were largest expense. By illegally dumping brine into mangroves, they saved 4.2M AED in April alone.',
      how: 'Loaded toxic brine onto company-owned vessel Liquidator VII (V-889). Vessel anchored in Sector 4 at 01:35. Captain disabled AIS transponder at 01:45 to avoid detection. Dumped concentrated brine directly into protected waters at 02:00, causing salinity spike from 42 to 88.5 ppt and pH drop to 6.2. Reactivated AIS at 02:45 and departed. Only disposed 8,000 tons officially in April vs 48,000 tons in March. Cross-referencing water_quality_sensors, maritime_ais_logs, vessel_registry, company_profiles, and official_disposal_manifests reveals C-42 as culprit.'
    }
  }
];