export type DiseaseImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type DiseaseAdvice = {
  short: string;
  signs: string[];
  transmission: string;
  treatment: string;
  prevention: string;
  tips: string[];
  imagesByAnimal?: Record<string, DiseaseImage | DiseaseImage[]>;
};

export const ANIMAL_TYPES = [
  "Cattle", "Goat", "Sheep", "Pig", "Chicken", "Duck", "Turkey",
  "Guinea fowl", "Rabbit", "Grasscutter"
];

export const DISEASE_ADVICE: Record<string, DiseaseAdvice> = {
  "foot and mouth disease": {
    short:
      "Foot-and-mouth disease (FMD) is a highly contagious viral disease affecting cloven-hoofed animals, including cattle, pigs, sheep, and goats.",
    signs: [
      "Fever and reduced appetite.",
      "Blister-like lesions that develop into sores on the tongue, lips, gums, or other parts of the mouth.",
      "Excessive salivation and difficulty eating.",
      "Lameness caused by lesions around the feet and hoof area.",
      "Reduced milk production in affected dairy animals."
    ],
    transmission:
      "The virus spreads readily through direct contact with infected animals, their secretions and excretions, contaminated equipment, vehicles, clothing, and other materials. Airborne spread can also occur under suitable conditions.",
    treatment:
      "There is no specific antiviral cure. Veterinary care focuses on supportive management, including access to clean water, suitable soft feed, and appropriate care of affected animals. Secondary infections and pain should be managed only under veterinary direction.",
    prevention:
      "Use vaccination programmes approved by animal-health authorities, maintain strict farm biosecurity, control animal movement, and isolate suspected cases. Follow official instructions during an outbreak.",
    tips: [
      "Isolate suspected animals and contact veterinary authorities promptly.",
      "Do not move animals, animal products, or equipment from an affected premises without official guidance.",
      "Clean and disinfect contaminated areas using products recommended by veterinary authorities.",
      "Avoid contact between affected animals and livestock on other farms."
    ],
    imagesByAnimal: {
      Cattle: {
        src: "/images/diseases/foot-and-mouth-disease.jpg",
        alt: "Foot-and-mouth disease reference image showing lesions in cattle"
      },
      Pig: {
        src: "/images/diseases/foot-and-mouth-disease-pig.jpg",
        alt: "Foot-and-mouth disease reference image showing a pig's foot"
      }
    }
  },

  mastitis: {
    short:
      "Mastitis is inflammation of the mammary gland (udder), commonly associated with bacterial infection. It can affect dairy animals, including cattle, goats, sheep, and pigs.",
    signs: [
      "Swelling, heat, redness, or pain around the mammary gland or udder.",
      "Milk that looks watery, discoloured, or contains clots or flakes in lactating animals.",
      "Reduced milk production.",
      "The affected animal may become uncomfortable during nursing or milking.",
      "Severe cases may cause fever, reduced appetite, weakness, or other signs of systemic illness."
    ],
    transmission:
      "Mastitis-causing organisms can spread during milking or nursing through contaminated hands, cloths, teats, and equipment. Environmental organisms may also enter the mammary gland from dirty or wet bedding.",
    treatment:
      "Treatment depends on the organism involved and the severity of the infection. A veterinarian may recommend sampling and laboratory testing before selecting treatment. Antibiotics, pain relief, and other care must be prescribed by a qualified professional. Observe all applicable milk and meat withdrawal periods.",
    prevention:
      "Maintain clean and dry housing, good milking and nursing hygiene, clean equipment, and appropriate teat care. Regularly monitor mammary health and milk quality where applicable.",
    tips: [
      "Check the mammary gland for swelling, heat, pain, and abnormal milk.",
      "Keep milking and nursing areas clean.",
      "Use clean hands and equipment when handling lactating animals.",
      "Seek veterinary attention when milk becomes abnormal or the animal appears unwell."
    ],
    imagesByAnimal: {
      Cattle: {
        src: "/images/diseases/mastitis.jpg",
        alt: "Mastitis reference image showing the udder of a cow"
      }
    }
  },

  anthrax: {
    short:
      "Anthrax is a serious disease caused by the spore-forming bacterium Bacillus anthracis. It can affect several livestock species, including cattle, goats, sheep, and pigs. It can also infect humans and requires urgent attention from veterinary and public-health authorities.",
    signs: [
      "Sudden unexplained death, sometimes without obvious earlier illness.",
      "High fever, weakness, or depression before death in some animals.",
      "Difficulty breathing or trembling.",
      "Dark blood that may fail to clot and may appear at natural body openings.",
      "Some affected animals may collapse and die rapidly."
    ],
    transmission:
      "Animals commonly become infected by ingesting spores from contaminated soil, feed, or water. Spores can survive in the environment for many years. People can also become infected through contact with infected animals, carcasses, animal products, or contaminated materials.",
    treatment:
      "Anthrax is a serious suspected outbreak condition. Do not attempt to treat, open, cut, or examine a suspected carcass. Contact veterinary and public-health authorities immediately and follow their instructions.",
    prevention:
      "Vaccination may be recommended in affected areas under veterinary supervision. Authorities should guide carcass disposal, site management, movement restrictions, and any necessary outbreak-control measures.",
    tips: [
      "NEVER open or cut into a suspected anthrax carcass.",
      "Do not touch, move, skin, or consume meat from a suspected carcass.",
      "Keep people, livestock, dogs, and other animals away from the carcass and surrounding area.",
      "Contact veterinary and public-health authorities urgently.",
      "Avoid handling blood, tissues, or other materials from a suspected case."
    ],
  },

  blackleg: {
    short:
      "Blackleg is an acute bacterial disease caused by Clostridium chauvoei. It can affect susceptible livestock, particularly cattle, sheep, and goats, and can progress very rapidly.",
    signs: [
      "Sudden fever, depression, and loss of appetite.",
      "Lameness or reluctance to move.",
      "Painful swelling, often in large muscle groups such as the thigh or shoulder.",
      "Affected muscle areas may feel swollen and may produce a crackling sensation when pressed.",
      "Rapid deterioration and sudden death may occur."
    ],
    transmission:
      "Animals commonly ingest bacterial spores from contaminated soil or pasture. The spores can remain in the environment for long periods and may become active in muscle tissue following injury or other conditions.",
    treatment:
      "The disease progresses quickly, so urgent veterinary attention is essential. A veterinarian must determine whether treatment is appropriate and select any medication. Severe cases may not respond because the disease can advance rapidly.",
    prevention:
      "Vaccination with an appropriate clostridial vaccine is an important preventive measure in areas where blackleg occurs. Follow the vaccination schedule recommended by a veterinarian and maintain good herd-health practices.",
    tips: [
      "Seek urgent veterinary help if an animal develops sudden painful muscle swelling or unexplained lameness.",
      "Do not rely on visible swelling alone to confirm blackleg.",
      "Handle and dispose of carcasses according to veterinary and environmental-health instructions.",
      "Discuss an appropriate clostridial vaccination programme with a veterinarian."
    ],
  },

  "peste des petits ruminants": {
    short:
      "Peste des petits ruminants (PPR), also called goat plague, is a highly contagious viral disease affecting sheep and goats. It can cause severe illness and significant losses.",
    signs: [
      "High fever, weakness, and loss of appetite.",
      "Discharge from the eyes and nose.",
      "Sores and erosions inside the mouth, sometimes with excessive salivation.",
      "Diarrhea, which may become severe and sometimes contain blood.",
      "Coughing or difficulty breathing due to respiratory involvement.",
      "Rapid weight loss and dehydration in severely affected animals."
    ],
    transmission:
      "PPR spreads mainly through close contact with infected animals and their respiratory secretions and discharges. Shared housing, feeding areas, and contaminated materials can contribute to spread.",
    treatment:
      "There is no specific antiviral cure. Veterinary care focuses on supportive management, hydration, nutrition, and treatment of secondary complications when appropriate. Suspected cases should be reported promptly and managed according to official veterinary instructions.",
    prevention:
      "Vaccination is an important control measure. Isolate suspected animals, control movement of sheep and goats, maintain clean housing, and follow veterinary guidance during outbreaks.",
    tips: [
      "Separate sick sheep and goats from healthy animals immediately.",
      "Provide clean drinking water and suitable feed if the animals can eat.",
      "Do not move animals from an affected flock without veterinary advice.",
      "Contact a veterinarian promptly, especially when fever, mouth sores, diarrhea, and respiratory signs occur together."
    ],
    imagesByAnimal: {
      Goat: {
        src: "/images/diseases/ppr.jpg",
        alt: "PPR reference image showing oral lesions in a small ruminant"
      }
    }
  },

  brucellosis: {
    short:
      "Brucellosis is a bacterial infection that can affect several livestock species, including cattle, goats, sheep, and pigs. It is also a zoonotic disease, meaning people can become infected.",
    signs: [
      "Abortion, particularly in later stages of pregnancy.",
      "Retained placenta or other reproductive complications.",
      "Weak offspring or reproductive failure.",
      "Reduced milk production in some affected animals.",
      "Some infected animals may show few obvious signs."
    ],
    transmission:
      "The bacteria can spread through infected birth fluids, placentas, aborted fetuses, vaginal discharges, milk, and contaminated environments. People are at risk through direct contact with infected materials or consumption of unpasteurised dairy products.",
    treatment:
      "Suspected brucellosis requires veterinary testing and management under animal-health authority guidance. Do not attempt to treat suspected breeding animals independently. Control programmes may involve testing, movement restrictions, vaccination, or other official measures.",
    prevention:
      "Use approved testing and vaccination programmes where recommended. Maintain safe handling practices during births and abortions, isolate suspected animals, and consume only properly pasteurised milk and dairy products.",
    tips: [
      "Wear suitable protective gloves when handling birth materials.",
      "Keep people and animals away from aborted fetuses and placentas.",
      "Do not drink raw or unpasteurised milk.",
      "Report repeated abortions or suspected reproductive disease to a veterinarian.",
      "Seek medical advice after possible exposure to infected animal materials."
    ],
    imagesByAnimal: {
      Cattle: {
        src: "/images/diseases/brucellosis.jpg",
        alt: "Brucellosis reference image showing a cow's legs"
      }
    }
  },

  "contagious ecthyma": {
    short:
      "Contagious ecthyma, commonly called orf or contagious pustular dermatitis, is a viral skin disease affecting sheep and goats. It commonly produces thick, crusted lesions around the mouth.",
    signs: [
      "Crusted, raised, or wart-like sores around the lips and mouth.",
      "Lesions around the nostrils, muzzle, or other parts of the face.",
      "In some animals, lesions may also occur on the feet or teats.",
      "Young animals may have difficulty suckling or eating.",
      "Severe mouth lesions can lead to poor body condition."
    ],
    transmission:
      "The virus spreads through direct contact with infected animals and contaminated equipment, bedding, or surfaces. It can enter through small breaks in the skin and may remain in contaminated scabs in the environment.",
    treatment:
      "There is no specific antiviral treatment. Veterinary care focuses on preventing secondary bacterial infection, managing pain where necessary, and helping affected animals continue to eat and drink. Do not pull off or aggressively remove crusts.",
    prevention:
      "Maintain good hygiene, isolate affected animals, clean and disinfect equipment, and reduce skin injuries. Vaccination may be appropriate in some flocks, but should be discussed with a veterinarian because vaccine use requires careful management.",
    tips: [
      "Wear gloves when handling animals with suspected orf because it can infect people.",
      "Avoid touching lesions or scabs with bare hands.",
      "Provide suitable feed and monitor young animals that struggle to suckle.",
      "Separate affected animals and clean shared equipment.",
      "Seek veterinary advice if lesions are severe, spreading, or preventing the animal from eating."
    ],
    imagesByAnimal: {
      Sheep: {
        src: "/images/diseases/contagious-ecthyma.jpg",
        alt: "Contagious ecthyma reference image showing lesions on a sheep's face"
      }
    }
  },

  "swine erysipelas": {
    short:
      "Swine erysipelas is a bacterial disease caused by Erysipelothrix rhusiopathiae. It can cause sudden illness, skin lesions, joint problems, and heart complications in pigs.",
    signs: [
      "Fever, reduced appetite, and weakness.",
      "Raised, red, or purple diamond-shaped skin patches in some cases.",
      "Lameness or swollen joints.",
      "Affected pigs may be reluctant to stand or walk.",
      "Longer-lasting infection can cause chronic joint or heart problems."
    ],
    transmission:
      "The bacteria can spread through infected animals, contaminated environments, and materials. Some pigs may carry the organism without showing obvious signs.",
    treatment:
      "A veterinarian should confirm the suspected condition and select appropriate treatment. Antibiotics may be effective when prescribed promptly, but the correct medicine, course, and withdrawal period must be determined professionally.",
    prevention:
      "Maintain clean housing, good hygiene, appropriate vaccination where recommended, and prompt veterinary attention for sick pigs. Reduce overcrowding and maintain good herd management.",
    tips: [
      "Seek veterinary attention when pigs develop fever, lameness, or unusual skin patches.",
      "Do not assume diamond-shaped skin lesions alone confirm erysipelas.",
      "Separate sick pigs and clean shared equipment.",
      "Follow veterinary advice about vaccination and treatment."
    ],
    imagesByAnimal: {
      Pig: {
        src: "/images/diseases/erysipelas.png",
        alt: "Swine erysipelas reference image showing skin lesions on a pig"
      }
    }
  },

  coccidiosis: {
    short:
      "Coccidiosis is a parasitic disease caused by microscopic protozoa of the genus Eimeria. Different Eimeria species affect different livestock, including cattle, goats, sheep, pigs, poultry, rabbits, and grasscutters. The signs and severity vary by host and parasite species.",
    signs: [
      "Watery droppings or diarrhea.",
      "Blood-stained or visibly bloody feces may occur in some forms.",
      "Reduced appetite, weight loss, and poor growth.",
      "Weakness, lethargy, and dehydration.",
      "Poor body condition and reduced production.",
      "Severe infections, particularly in young animals, may cause death."
    ],
    transmission:
      "Animals become infected by swallowing parasite oocysts from contaminated feed, water, bedding, soil, litter, or surfaces. Overcrowding, poor sanitation, and damp housing can increase exposure.",
    treatment:
      "A veterinarian should assess the affected animal or group and recommend an appropriate anticoccidial treatment when necessary. The medicine and dose depend on the host species, age, and severity. Follow product instructions and applicable meat or egg withdrawal requirements.",
    prevention:
      "Maintain clean and dry housing, prevent faecal contamination of feed and water, avoid overcrowding, and clean feeding and drinking equipment regularly. Good sanitation and appropriate veterinary prevention programmes help reduce infection.",
    tips: [
      "Monitor droppings, appetite, growth, and general activity.",
      "Do not diagnose coccidiosis from stool colour alone.",
      "Remove wet or heavily contaminated bedding and address water leaks.",
      "Keep feeders and drinkers clean and prevent faecal contamination.",
      "Seek veterinary advice when diarrhea, bloody stool, weakness, or poor growth occurs."
    ],
    imagesByAnimal: {
      Chicken: {
        src: "/images/diseases/coccidiosis.jpg",
        alt: "Coccidiosis reference image showing a chicken"
      },
      Cattle: {
        src: "/images/diseases/coccidiosis-cattle.jpg",
        alt: "Coccidiosis reference image showing cattle"
      }
    }
  },

  "newcastle disease": {
    short:
      "Newcastle disease is a contagious viral disease of birds, including chickens, guinea fowl, ducks, and turkeys. The severity varies with the virus strain, bird species, age, and immune status.",
    signs: [
      "Coughing, sneezing, or difficulty breathing.",
      "Loss of appetite, weakness, and reduced activity.",
      "Greenish or watery droppings may occur, but their appearance is not specific to Newcastle disease.",
      "Twisting of the neck, tremors, paralysis, or other nervous signs in some cases.",
      "Reduced egg production or abnormal eggs.",
      "Sudden deaths may occur in severe outbreaks."
    ],
    transmission:
      "The virus spreads through contact with infected birds, respiratory secretions, droppings, contaminated feed and water, equipment, footwear, and clothing.",
    treatment:
      "There is no specific antiviral cure. A poultry veterinarian can advise on supportive care and outbreak management. Suspected outbreaks should be reported to veterinary authorities, especially when sudden deaths occur.",
    prevention:
      "Follow a suitable Newcastle disease vaccination schedule, maintain strict bird-house hygiene, control visitors, and prevent contact with potentially infected birds.",
    tips: [
      "Separate sick birds from healthy birds where it can be done safely.",
      "Restrict movement of birds, eggs, equipment, and visitors during a suspected outbreak.",
      "Clean and disinfect housing and equipment using recommended products.",
      "Report sudden or unexplained bird deaths to a veterinary professional.",
      "Do not use green droppings alone to identify Newcastle disease."
    ],
    imagesByAnimal: {
      Chicken: {
        src: "/images/diseases/newcastle-disease.jpeg",
        alt: "Newcastle disease reference image showing a chicken"
      }
    }
  },

  "avian influenza": {
    short:
      "Avian influenza, commonly called bird flu, is a viral infection of birds. It can affect domestic poultry and other bird species, including chickens, guinea fowl, ducks, and turkeys. Highly pathogenic strains can cause severe illness and sudden, high mortality. Some strains can also infect people.",
    signs: [
      "Sudden unexplained deaths or a rapid increase in flock mortality.",
      "Severe weakness, reduced activity, and loss of appetite.",
      "Difficulty breathing, coughing, or nasal discharge.",
      "Diarrhea may occur.",
      "Swelling or dark discoloration of the comb, wattles, or other body parts in some birds.",
      "Tremors, twisted head or neck, or other nervous signs in some birds.",
      "Reduced egg production."
    ],
    transmission:
      "The virus can spread through infected birds, respiratory secretions, droppings, contaminated water, equipment, footwear, clothing, and contact with infected wild birds.",
    treatment:
      "Do not attempt to treat, sell, slaughter, or move suspected infected birds. Contact veterinary authorities immediately and follow official instructions for testing, isolation, movement restrictions, and outbreak control.",
    prevention:
      "Prevent contact between domestic birds and wild birds, protect feed and water from contamination, restrict visitors, disinfect equipment, and maintain strict farm biosecurity.",
    tips: [
      "Report sudden or unexplained bird deaths immediately.",
      "Do not handle sick or dead birds with bare hands.",
      "Restrict movement of birds, eggs, people, and equipment while awaiting official advice.",
      "Keep domestic birds away from wild birds and shared water sources.",
      "Follow veterinary and public-health instructions during a suspected outbreak."
    ],
    imagesByAnimal: {
      Chicken: {
        src: "/images/diseases/avian-influenza-chicken.jpg",
        alt: "Avian influenza reference image showing a chicken"
      }
    }
  },

  "contagious bovine pleuropneumonia": {
    short:
      "Contagious bovine pleuropneumonia (CBPP) is a serious contagious respiratory disease of cattle caused by Mycoplasma mycoides subsp. mycoides. It affects the lungs and the membranes surrounding them.",
    signs: [
      "Persistent coughing, especially after movement.",
      "Laboured or painful breathing.",
      "Fever and loss of appetite.",
      "Nasal discharge may occur.",
      "Affected cattle may stand with their front legs apart and neck extended to ease breathing.",
      "Weight loss and reduced milk production may develop in prolonged cases."
    ],
    transmission:
      "CBPP spreads mainly through close contact with infected cattle when they release infectious droplets while coughing or breathing. Animals that recover may sometimes remain carriers and contribute to continued spread.",
    treatment:
      "Suspected CBPP requires veterinary assessment and official disease-control guidance. Treatment policies vary by country and outbreak situation. Do not select or administer antibiotics without veterinary direction, as treatment may not eliminate infection or carrier status.",
    prevention:
      "Control animal movement, isolate suspected cattle, obtain veterinary testing, and follow official vaccination or outbreak-control programmes where applicable. Avoid introducing cattle from unknown health sources.",
    tips: [
      "Isolate cattle showing persistent coughing or difficulty breathing.",
      "Contact a veterinarian or livestock disease-control authority promptly.",
      "Avoid moving cattle into or out of a suspected affected herd.",
      "Do not assume every respiratory illness is CBPP; veterinary testing is needed."
    ],
  },

  "lumpy skin disease": {
    short:
      "Lumpy skin disease is a viral disease of cattle caused by lumpy skin disease virus. It is characterised by firm skin nodules and can lead to production losses, hide damage, and secondary complications.",
    signs: [
      "Firm, raised nodules on the skin, which may occur over the body, neck, head, and limbs.",
      "Fever, weakness, and loss of appetite.",
      "Swelling of the skin or limbs.",
      "Enlarged lymph nodes may occur.",
      "Nasal or eye discharge may be present.",
      "Reduced milk production and weight loss.",
      "Some skin nodules may develop into sores or scabs."
    ],
    transmission:
      "The virus is transmitted mainly by biting insects and other blood-feeding arthropods. Direct contact and contaminated materials may also contribute under some circumstances.",
    treatment:
      "There is no specific antiviral cure. Veterinary management focuses on supportive care, wound management, hydration, nutrition, and treatment of secondary infections when appropriate. Medication should be selected by a veterinarian.",
    prevention:
      "Vaccination with an approved vaccine is an important control measure where recommended. Use insect-control measures, isolate suspected cattle, maintain farm hygiene, and follow veterinary movement-control advice.",
    tips: [
      "Report unusual skin nodules or suspected cases to a veterinarian.",
      "Separate affected cattle from healthy animals.",
      "Reduce exposure to biting insects where practical.",
      "Do not puncture or cut skin nodules yourself.",
      "Follow veterinary advice on vaccination and movement restrictions."
    ],
    imagesByAnimal: {
      Cattle: {
        src: "/images/diseases/lumpy-skin-disease-cattle.jpg",
        alt: "Lumpy skin disease reference image showing a cow with skin nodules"
      }
    }
  },

  pasteurellosis: {
    short:
      "Pasteurellosis refers to diseases associated with bacteria of the Pasteurella group, particularly Pasteurella multocida. It can affect several livestock species, including cattle, goats, sheep, pigs, rabbits, and grasscutters. The illness may involve the respiratory system or other tissues.",
    signs: [
      "Fever, weakness, and loss of appetite.",
      "Coughing, nasal discharge, or laboured breathing.",
      "Swelling around the throat, head, or other tissues in some forms.",
      "Diarrhea may occur in some affected animals.",
      "Rapid deterioration can occur in severe infections.",
      "Reduced growth or production in animals with prolonged illness."
    ],
    transmission:
      "Spread can occur through respiratory droplets, close contact with infected animals, and contaminated secretions or environments. Stress, overcrowding, poor ventilation, and other infections can increase the risk of disease.",
    treatment:
      "A veterinarian should assess the animal and determine the likely infection before selecting treatment. Antimicrobial medicines may be used in some cases, but the choice and dose depend on the animal species and clinical situation. Do not medicate animals without veterinary advice.",
    prevention:
      "Maintain good ventilation, reduce overcrowding and stress, isolate sick animals, clean housing and equipment, and obtain veterinary advice about vaccination where appropriate for the species and production system.",
    tips: [
      "Separate animals showing respiratory distress or severe weakness.",
      "Keep housing clean, dry, and adequately ventilated.",
      "Avoid overcrowding and reduce unnecessary stress during transport or handling.",
      "Seek veterinary attention early, especially when breathing becomes difficult.",
      "Do not assume every respiratory infection is pasteurellosis."
    ],
  },

  "sarcoptic mange": {
    short:
      "Sarcoptic mange is a contagious skin disease caused by the mite Sarcoptes scabiei. It can affect several mammals, including cattle, goats, sheep, pigs, rabbits, and grasscutters. The mites cause irritation and inflammation of the skin.",
    signs: [
      "Intense itching, rubbing, and scratching.",
      "Hair loss or thinning of the coat.",
      "Crusted, thickened, or scaly skin.",
      "Skin lesions may appear around the ears, face, neck, limbs, or other body areas.",
      "Restlessness and reduced feeding due to irritation.",
      "Weight loss or poor body condition in severe or prolonged cases."
    ],
    transmission:
      "The mites spread mainly through close contact with infested animals. Contaminated bedding, housing, or equipment may also contribute to transmission.",
    treatment:
      "A veterinarian should confirm the suspected infestation and recommend an appropriate acaricide or other treatment suitable for the animal species. Treatment may need to include in-contact animals and environmental cleaning. Never use livestock products on another species unless specifically approved.",
    prevention:
      "Isolate affected animals, inspect new arrivals before mixing them with the herd or group, clean housing and bedding, and follow veterinary guidance for parasite control.",
    tips: [
      "Avoid sharing grooming equipment and other materials between affected and healthy animals.",
      "Wear gloves when handling animals with extensive skin lesions.",
      "Clean and replace contaminated bedding.",
      "Seek veterinary advice before applying dips, sprays, or other skin treatments.",
      "Monitor other animals that have had close contact with an affected animal."
    ],
    imagesByAnimal: {
      Cattle: {
        src: "/images/diseases/sarcoptic-mange-cattle.jpeg",
        alt: "Sarcoptic mange reference image showing skin changes on cattle"
      }
    }
  },

  "african swine fever": {
    short:
      "African swine fever (ASF) is a highly contagious viral disease of domestic pigs and wild suids. It can cause severe illness and high mortality. It does not infect humans, but it can have devastating effects on pig production.",
    signs: [
      "High fever, weakness, and loss of appetite.",
      "Red, purple, or bluish discoloration of the ears, abdomen, or limbs.",
      "Skin haemorrhages or other bleeding signs.",
      "Diarrhea, sometimes with blood.",
      "Difficulty breathing or other respiratory signs.",
      "Unsteady movement or other nervous-system signs may occur.",
      "Sudden death or reproductive problems may occur."
    ],
    transmission:
      "The virus spreads through contact with infected pigs, their secretions and excretions, contaminated equipment, vehicles, clothing, and infected pork products. Feeding contaminated food scraps can also spread infection. Certain tick species can transmit the virus in some regions.",
    treatment:
      "There is no specific treatment that eliminates the virus. Suspected cases must be reported immediately to veterinary authorities. Follow official instructions on isolation, movement restrictions, testing, carcass handling, and outbreak control.",
    prevention:
      "Maintain strict farm biosecurity, control introductions of new pigs, clean and disinfect equipment and vehicles, prevent contact with wild pigs where relevant, and avoid feeding untreated food waste or meat-containing scraps. Follow local veterinary control policies.",
    tips: [
      "Isolate suspected pigs and contact veterinary authorities immediately.",
      "Do not move pigs, pork products, or equipment from the affected premises without official permission.",
      "Keep visitors and unnecessary vehicles away from the piggery.",
      "Do not feed pigs untreated food waste or scraps that may contain pork.",
      "Do not assume that purple skin or diarrhea alone confirms African Swine Fever."
    ],
    imagesByAnimal: {
      Pig: [
        {
          src: "/images/diseases/african-swine-fever-pig.jpg",
          alt: "African swine fever reference image showing a pig's snout",
          caption: "Pig snout close-up"
        },
        {
          src: "/images/diseases/african-swine-fever-2-pig.jpg",
          alt: "African swine fever reference image showing a pig's legs and skin",
          caption: "Pig legs and skin"
        }
      ]
    }
  },

  "fowl pox": {
    short:
      "Fowl pox is a viral disease of birds caused by avipoxviruses. It commonly affects chickens and turkeys and can also occur in other bird species. It has a dry form affecting the skin and a wet form affecting the mouth and upper respiratory tract.",
    signs: [
      "Raised wart-like nodules or scabs on the comb, wattles, eyelids, and other unfeathered skin.",
      "Crusted lesions around the beak or eyes.",
      "Difficulty seeing or eating when lesions are extensive.",
      "Yellowish or whitish plaques in the mouth or throat in the wet form.",
      "Difficulty breathing or swallowing in severe wet-form cases.",
      "Reduced egg production and poor growth."
    ],
    transmission:
      "The virus can spread through mosquitoes and other biting insects, direct contact with infected birds, and contaminated scabs or equipment. The virus may persist in dried scabs in the environment.",
    treatment:
      "There is no specific antiviral cure. Veterinary care focuses on supportive management, maintaining access to food and water, and managing secondary infections where necessary. Birds with severe mouth or throat lesions require prompt veterinary assessment.",
    prevention:
      "Vaccination is an important preventive measure in areas where fowl pox occurs. Control biting insects, clean poultry housing, isolate affected birds, and avoid sharing contaminated equipment.",
    tips: [
      "Check the comb, wattles, eyelids, and mouth for unusual lesions.",
      "Separate affected birds from healthy birds.",
      "Reduce mosquito breeding sites and other insect exposure.",
      "Keep feeders and drinkers clean and accessible.",
      "Ask a poultry veterinarian about vaccination and outbreak management."
    ],
  },

  "histomoniasis": {
    short:
      "Histomoniasis, also called blackhead disease, is a parasitic disease caused by Histomonas meleagridis. It is especially serious in turkeys and can also affect chickens and guinea fowl.",
    signs: [
      "Depression, weakness, and loss of appetite.",
      "Yellowish or sulphur-coloured droppings may occur.",
      "Diarrhea and dehydration.",
      "Weight loss and poor growth.",
      "Drooping wings and reduced activity.",
      "In severe cases, birds may die following liver and intestinal damage."
    ],
    transmission:
      "The parasite is commonly spread through the caecal worm Heterakis gallinarum and its eggs. Earthworms can act as carriers. Infected birds and contaminated litter or soil can contribute to transmission.",
    treatment:
      "There is no universally reliable approved treatment for all production settings. A poultry veterinarian should confirm the suspected disease and advise on management, supportive care, parasite control, and any locally permitted treatment options.",
    prevention:
      "Use good litter and soil management, control caecal worms, prevent contact with contaminated ground, and avoid mixing turkeys with chickens where possible. Maintain appropriate farm biosecurity.",
    tips: [
      "Seek veterinary advice when birds show weakness, diarrhea, and poor growth.",
      "Pay particular attention to turkeys, which can be severely affected.",
      "Avoid keeping young turkeys on ground previously used by infected birds.",
      "Control worms and maintain clean housing.",
      "Do not rely on yellow droppings alone to confirm blackhead disease."
    ],
  },

  "infectious coryza": {
    short:
      "Infectious coryza is a contagious bacterial respiratory disease of chickens caused by Avibacterium paragallinarum. It mainly affects the upper respiratory tract and can reduce flock productivity.",
    signs: [
      "Swelling of the face and area around the eyes.",
      "Nasal discharge, which may become thick or foul-smelling.",
      "Watery or swollen eyes.",
      "Sneezing and coughing.",
      "Reduced appetite and weakness.",
      "Reduced egg production and poor growth."
    ],
    transmission:
      "The disease spreads through direct contact with infected birds, respiratory droplets, and contaminated drinking water, feeders, and equipment. Recovered birds may remain carriers.",
    treatment:
      "A poultry veterinarian should confirm the suspected disease and select any appropriate treatment. Antimicrobial treatment may reduce clinical signs in some cases, but it does not necessarily eliminate carrier birds. Follow veterinary instructions and medicine withdrawal periods.",
    prevention:
      "Maintain good ventilation and hygiene, isolate affected birds, avoid introducing birds from unknown sources, and discuss vaccination with a poultry veterinarian where appropriate.",
    tips: [
      "Separate birds with facial swelling or nasal discharge.",
      "Clean drinkers, feeders, and shared equipment regularly.",
      "Avoid overcrowding and maintain good ventilation.",
      "Seek veterinary advice because other respiratory diseases can look similar.",
      "Follow veterinary guidance before returning recovered birds to the flock."
    ],
  },

  "duck viral enteritis": {
    short:
      "Duck viral enteritis (DVE), also known as duck plague, is a contagious and often severe viral disease of ducks and other susceptible waterfowl. It can cause significant illness and mortality in affected flocks.",
    signs: [
      "Sudden weakness, depression, and loss of appetite.",
      "Watery or bloody diarrhea.",
      "Excessive thirst and dehydration.",
      "Blood-stained discharge from the mouth or other openings may occur.",
      "Reduced egg production.",
      "Difficulty moving or other signs of severe illness.",
      "Sudden death may occur, particularly during serious outbreaks."
    ],
    transmission:
      "The virus spreads through contact with infected waterfowl, their secretions and excretions, and contaminated water or environments. Shared ponds and waterways can contribute to transmission.",
    treatment:
      "There is no specific antiviral cure. Suspected outbreaks require prompt veterinary assessment and official guidance. Supportive care may be considered under veterinary direction, but it does not eliminate the virus.",
    prevention:
      "Use vaccination where recommended and available, isolate affected birds, prevent contact with infected or wild waterfowl, and maintain clean water sources and good farm biosecurity.",
    tips: [
      "Separate sick ducks from healthy birds and other waterfowl.",
      "Do not move or sell suspected infected birds.",
      "Avoid sharing ponds or water sources between affected and healthy groups.",
      "Contact a veterinarian promptly when sudden deaths or bloody diarrhea occur.",
      "Follow official veterinary instructions during a suspected outbreak."
    ],
    imagesByAnimal: {
      Duck: {
        src: "/images/diseases/duck-viral-enteritis-duck.jpg",
        alt: "Duck viral enteritis reference image showing a duck"
      }
    }
  }
};

export function normalizeDiseaseName(name: string) {
  const normalized = name.toLowerCase().trim();

  const aliases: Record<string, string> = {
    ppr: "peste des petits ruminants",
    "peste des petits ruminants (ppr)": "peste des petits ruminants",
    "goat plague": "peste des petits ruminants",
    orf: "contagious ecthyma",
    "contagious ecthyma (orf)": "contagious ecthyma",
    "contagious pustular dermatitis": "contagious ecthyma",
    "hog cholera": "classical swine fever",
    "swine erysipelas": "swine erysipelas",
    erysipelas: "swine erysipelas",
    "contagious bovine pleuropneumonia (cbpp)": "contagious bovine pleuropneumonia",
    cbpp: "contagious bovine pleuropneumonia",
    "lumpy skin disease": "lumpy skin disease",
    "african swine fever (asf)": "african swine fever",
    asf: "african swine fever",
    "histomoniasis (blackhead)": "histomoniasis",
    blackhead: "histomoniasis",
    "duck plague": "duck viral enteritis",
    "duck viral enteritis (dve)": "duck viral enteritis",
    dve: "duck viral enteritis"
  };

  return aliases[normalized] || normalized;
}

export function formatDiseaseName(name: string) {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getDiseaseImages(diseaseName: string, animalType: string) {
  const key = normalizeDiseaseName(diseaseName);
  const images = DISEASE_ADVICE[key]?.imagesByAnimal?.[animalType];
  return images ? Array.isArray(images) ? images : [images] : [];
}

export const DISEASE_ANIMALS: Record<string, string[]> = {
  "african swine fever": ["Pig"],
  anthrax: ["Cattle", "Goat", "Pig", "Sheep"],
  "avian influenza": ["Chicken", "Duck", "Guinea fowl", "Turkey"],
  blackleg: ["Cattle", "Goat", "Sheep"],
  brucellosis: ["Cattle", "Goat", "Pig", "Sheep"],
  coccidiosis: ["Cattle", "Chicken", "Duck", "Goat", "Grasscutter", "Guinea fowl", "Pig", "Rabbit", "Sheep", "Turkey"],
  "contagious bovine pleuropneumonia": ["Cattle"],
  "contagious ecthyma": ["Goat", "Sheep"],
  "duck viral enteritis": ["Duck"],
  "foot and mouth disease": ["Cattle", "Goat", "Pig", "Sheep"],
  "fowl pox": ["Chicken", "Guinea fowl", "Turkey"],
  histomoniasis: ["Chicken", "Guinea fowl", "Turkey"],
  "infectious coryza": ["Chicken", "Guinea fowl"],
  "lumpy skin disease": ["Cattle"],
  mastitis: ["Cattle", "Goat", "Pig", "Sheep"],
  "newcastle disease": ["Chicken", "Duck", "Guinea fowl", "Turkey"],
  pasteurellosis: ["Cattle", "Goat", "Grasscutter", "Pig", "Rabbit", "Sheep"],
  "peste des petits ruminants": ["Goat", "Sheep"],
  "sarcoptic mange": ["Cattle", "Goat", "Grasscutter", "Pig", "Rabbit", "Sheep"],
  "swine erysipelas": ["Pig"]
};
