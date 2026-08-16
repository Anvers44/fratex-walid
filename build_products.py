import json, os

OUT = os.path.expanduser("~/Documents/Dev/Fratex-Walid/assets/data")


def prod(id_, name, cat, subcat, image, short, desc, specs):
    return {
        "id": id_,
        "name": name,
        "category": cat,
        "subcategory": subcat,
        "image": image,
        "shortDescription": short,
        "description": desc,
        "specs": specs
    }


SECTIONS = []


# ---------------- HOTELLERIE ----------------
hotellerie = {
    "section": "hotellerie",
    "sectionLabel": "Hôtellerie",
    "sectionTagline": "Des gammes qui tiennent la rotation, chambre après chambre.",
    "categories": [
        {"id": "linge-de-lit", "label": "Linge de lit", "subcategories": [
            {"id": "draps", "label": "Draps"},
            {"id": "housses-de-couette", "label": "Housses de couette"}
        ]},
        {"id": "linge-de-bain", "label": "Linge de bain", "subcategories": [
            {"id": "serviettes", "label": "Serviettes"},
            {"id": "peignoirs", "label": "Peignoirs"}
        ]},
        {"id": "accessoires", "label": "Accessoires", "subcategories": [
            {"id": "sacs-a-linge", "label": "Sacs à linge"},
            {"id": "chariots", "label": "Chariots"}
        ]}
    ],
    "products": [
        prod("drap-plat-percale-blanc", "Drap plat percale blanc", "linge-de-lit", "draps",
             "assets/picture/Chambre.webp",
             "Drap plat en percale de coton, tenue impeccable après blanchisserie intensive.",
             "Confectionné en percale de coton resserré pour un tombé net et une bonne résistance aux lavages industriels répétés.",
             [{"label": "Matière", "value": "100% coton percale"}, {"label": "Grammage", "value": "≈ 130 g/m²"}, {"label": "Entretien", "value": "Lavage industriel 60-90°C"}]),
        prod("drap-housse-percale-blanc", "Drap housse percale blanc", "linge-de-lit", "draps",
             "assets/picture/Chambre.webp",
             "Drap housse à coins renforcés pour un usage quotidien en chambre d'hôtel.",
             "Élastique ceinturé et coins renforcés pour rester en place malgré les changements de linge fréquents.",
             [{"label": "Matière", "value": "100% coton percale"}, {"label": "Tailles", "value": "90 à 180 cm"}, {"label": "Entretien", "value": "Lavage industriel 60-90°C"}]),
        prod("housse-de-couette-satin", "Housse de couette satin de coton", "linge-de-lit", "housses-de-couette",
             "assets/picture/Chambre.webp",
             "Housse de couette en satin de coton, finition haut de gamme pour chambres premium.",
             "Tissage satin qui apporte brillance légère et douceur, pensé pour les établissements haut de gamme.",
             [{"label": "Matière", "value": "100% coton satin"}, {"label": "Fermeture", "value": "Boutons pression"}, {"label": "Entretien", "value": "Lavage industriel 60°C"}]),
        prod("housse-de-couette-percale", "Housse de couette percale unie", "linge-de-lit", "housses-de-couette",
             "assets/picture/Chambre.webp",
             "Version percale, plus économique, pour un usage intensif toutes chambres.",
             "Alternative robuste et abordable à la satin, conçue pour les rotations fréquentes en blanchisserie.",
             [{"label": "Matière", "value": "100% coton percale"}, {"label": "Fermeture", "value": "Rabat intérieur"}, {"label": "Entretien", "value": "Lavage industriel 60-90°C"}]),
        prod("serviette-eponge-500", "Serviette éponge 500 g/m²", "linge-de-bain", "serviettes",
             "assets/picture/Bain.jpg",
             "Serviette éponge dense, absorption élevée, conçue pour un usage hôtelier intensif.",
             "Bouclette resserrée qui conserve son moelleux après de nombreux cycles de lavage industriel.",
             [{"label": "Matière", "value": "100% coton éponge"}, {"label": "Grammage", "value": "500 g/m²"}, {"label": "Tailles", "value": "30x50 à 100x150 cm"}]),
        prod("drap-de-bain-eponge", "Drap de bain éponge", "linge-de-bain", "serviettes",
             "assets/picture/Bain.jpg",
             "Grand format éponge pour chambres et spas d'hôtel.",
             "Format généreux, séchage rapide, pensé pour accompagner les gammes serviettes en cohérence visuelle.",
             [{"label": "Matière", "value": "100% coton éponge"}, {"label": "Grammage", "value": "500 g/m²"}, {"label": "Format", "value": "100x150 cm"}]),
        prod("peignoir-col-chale", "Peignoir col châle", "linge-de-bain", "peignoirs",
             "assets/picture/Bain.jpg",
             "Peignoir hôtelier confortable, coupe classique col châle.",
             "Coupe ample et ceinture nouée, pensé pour le confort en chambre comme en espace bien-être.",
             [{"label": "Matière", "value": "Coton éponge"}, {"label": "Tailles", "value": "S à XL"}, {"label": "Entretien", "value": "Lavage industriel 60°C"}]),
        prod("peignoir-capuche-spa", "Peignoir à capuche spa", "linge-de-bain", "peignoirs",
             "assets/picture/Bain.jpg",
             "Version à capuche pour les espaces spa et bien-être de l'établissement.",
             "Capuche intégrée et matière absorbante, adapté aux parcours spa et zones humides.",
             [{"label": "Matière", "value": "Coton éponge"}, {"label": "Tailles", "value": "Unique / S à XL"}, {"label": "Entretien", "value": "Lavage industriel 60°C"}]),
        prod("sac-a-linge-toile", "Sac à linge en toile", "accessoires", "sacs-a-linge",
             "assets/picture/Accessoires.jpg",
             "Sac à linge robuste pour la collecte en étage.",
             "Toile résistante et anses renforcées pour suivre le rythme des rotations de blanchisserie.",
             [{"label": "Matière", "value": "Toile coton/polyester"}, {"label": "Capacité", "value": "≈ 25 kg"}, {"label": "Entretien", "value": "Lavable en machine"}]),
        prod("sac-a-linge-filet", "Sac à linge filet", "accessoires", "sacs-a-linge",
             "assets/picture/Accessoires.jpg",
             "Sac filet pour un tri visuel rapide du linge en cours de traitement.",
             "Maillage ajouré qui facilite le tri et le passage direct en machine à laver.",
             [{"label": "Matière", "value": "Polyester filet"}, {"label": "Capacité", "value": "≈ 15 kg"}, {"label": "Entretien", "value": "Lavable en machine"}]),
        prod("chariot-linge-etage", "Chariot à linge d'étage", "accessoires", "chariots",
             "assets/picture/Accessoires.jpg",
             "Chariot compact pour le transport du linge propre et sale en étage.",
             "Structure roulante compartimentée, pensée pour circuler facilement dans les couloirs.",
             [{"label": "Structure", "value": "Métal/toile"}, {"label": "Compartiments", "value": "2 à 3"}, {"label": "Roues", "value": "Pivotantes silencieuses"}]),
        prod("chariot-linge-housse", "Chariot à linge avec housse", "accessoires", "chariots",
             "assets/picture/Accessoires.jpg",
             "Version avec housse pour protéger le linge propre pendant le transport.",
             "Housse amovible qui protège le linge propre de la poussière et des projections en circulation.",
             [{"label": "Structure", "value": "Métal/toile"}, {"label": "Housse", "value": "Amovible, lavable"}, {"label": "Roues", "value": "Pivotantes silencieuses"}])
    ]
}


# ---------------- RESTAURATION ----------------
restauration = {
    "section": "restauration",
    "sectionLabel": "Restauration",
    "sectionTagline": "Le textile de salle et de cuisine, pensé pour l'usage intensif.",
    "categories": [
        {"id": "linge-de-table", "label": "Linge de table", "subcategories": [
            {"id": "nappes", "label": "Nappes"},
            {"id": "serviettes-de-table", "label": "Serviettes de table"}
        ]},
        {"id": "linge-de-cuisine", "label": "Linge de cuisine", "subcategories": [
            {"id": "torchons", "label": "Torchons"},
            {"id": "tabliers", "label": "Tabliers"}
        ]}
    ],
    "products": [
        prod("nappe-ronde-blanche", "Nappe ronde blanche", "linge-de-table", "nappes",
             "assets/picture/texture.jpg",
             "Nappe ronde pour salle de restaurant, tenue nette en service.",
             "Tissu résistant aux taches courantes de salle, pensé pour un repassage industriel efficace.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Diamètre", "value": "180 à 240 cm"}, {"label": "Entretien", "value": "Lavage + repassage industriel"}]),
        prod("nappe-rectangulaire-couleur", "Nappe rectangulaire couleur", "linge-de-table", "nappes",
             "assets/picture/texture.jpg",
             "Nappe rectangulaire disponible en plusieurs teintes pour s'accorder au décor de salle.",
             "Coloris stables au lavage, adaptés à une utilisation quotidienne en salle de restaurant.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Format", "value": "140x240 cm et +"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("serviette-table-blanche", "Serviette de table blanche", "linge-de-table", "serviettes-de-table",
             "assets/picture/texture.jpg",
             "Serviette de table classique, pliage net et tenue en service.",
             "Grammage équilibré entre tenue en main et confort, pour un pliage propre en salle.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Format", "value": "45x45 cm"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("serviette-table-couleur", "Serviette de table couleur", "linge-de-table", "serviettes-de-table",
             "assets/picture/texture.jpg",
             "Version colorée pour accompagner les nappes teintées.",
             "Teintes assorties aux nappes couleur pour une mise en place cohérente en salle.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Format", "value": "45x45 cm"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("torchon-nid-abeille", "Torchon nid d'abeille", "linge-de-cuisine", "torchons",
             "assets/picture/cuisine.jpg",
             "Torchon absorbant pour un usage intensif en cuisine professionnelle.",
             "Tissage nid d'abeille qui optimise l'absorption tout en séchant rapidement entre deux services.",
             [{"label": "Matière", "value": "100% coton"}, {"label": "Format", "value": "50x70 cm"}, {"label": "Entretien", "value": "Lavage industriel 60-90°C"}]),
        prod("torchon-microfibre", "Torchon microfibre", "linge-de-cuisine", "torchons",
             "assets/picture/cuisine.jpg",
             "Torchon microfibre pour le nettoyage de surfaces et plans de travail.",
             "Fibres fines qui captent poussière et graisse sans laisser de peluches sur les surfaces.",
             [{"label": "Matière", "value": "Microfibre"}, {"label": "Format", "value": "40x60 cm"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("tablier-bavette-cuisine", "Tablier bavette cuisine", "linge-de-cuisine", "tabliers",
             "assets/picture/cuisine.jpg",
             "Tablier de cuisine résistant, bretelles réglables.",
             "Coupe pensée pour un usage debout prolongé en cuisine, avec poche avant pratique.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Réglage", "value": "Bretelles et taille ajustables"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("tablier-mi-long", "Tablier mi-long service", "linge-de-cuisine", "tabliers",
             "assets/picture/cuisine.jpg",
             "Tablier mi-long adapté au personnel de salle comme de cuisine.",
             "Format polyvalent qui convient aussi bien en salle qu'en cuisine selon les besoins de l'équipe.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Longueur", "value": "Mi-long"}, {"label": "Entretien", "value": "Lavage industriel"}])
    ]
}


# ---------------- MAISON ----------------
maison = {
    "section": "maison",
    "sectionLabel": "Maison",
    "sectionTagline": "Le linge de maison Fratex, pour les particuliers exigeants.",
    "categories": [
        {"id": "linge-de-lit", "label": "Linge de lit", "subcategories": [
            {"id": "parures", "label": "Parures de lit"},
            {"id": "taies", "label": "Taies d'oreiller"}
        ]},
        {"id": "decoration-textile", "label": "Décoration textile", "subcategories": [
            {"id": "plaids", "label": "Plaids"},
            {"id": "coussins", "label": "Coussins"}
        ]}
    ],
    "products": [
        prod("parure-percale-ivoire", "Parure percale ivoire", "linge-de-lit", "parures",
             "assets/picture/Chambre.webp",
             "Parure complète en percale de coton, teinte ivoire.",
             "Ensemble housse de couette et taies assortis, pour une chambre soignée au quotidien.",
             [{"label": "Matière", "value": "100% coton percale"}, {"label": "Composition", "value": "Housse + 2 taies"}, {"label": "Entretien", "value": "Lavage machine 40-60°C"}]),
        prod("parure-satin-gris", "Parure satin gris perle", "linge-de-lit", "parures",
             "assets/picture/Chambre.webp",
             "Parure satin de coton, finition brillante et douce.",
             "Toucher soyeux et tombé fluide, pour une chambre à l'allure plus habillée.",
             [{"label": "Matière", "value": "100% coton satin"}, {"label": "Composition", "value": "Housse + 2 taies"}, {"label": "Entretien", "value": "Lavage machine 40°C"}]),
        prod("taie-percale-blanche", "Taie percale blanche", "linge-de-lit", "taies",
             "assets/picture/Chambre.webp",
             "Taie d'oreiller unie, vendue à l'unité ou par lot.",
             "Finition simple et nette, pensée pour compléter ou renouveler une parure existante.",
             [{"label": "Matière", "value": "100% coton percale"}, {"label": "Format", "value": "50x70 cm / 65x65 cm"}, {"label": "Entretien", "value": "Lavage machine 40-60°C"}]),
        prod("taie-brodee", "Taie brodée fil ton sur ton", "linge-de-lit", "taies",
             "assets/picture/Chambre.webp",
             "Taie avec liseré brodé discret pour une touche plus soignée.",
             "Broderie ton sur ton en bordure, un détail qui habille la taie sans surcharger.",
             [{"label": "Matière", "value": "100% coton percale"}, {"label": "Détail", "value": "Bordure brodée"}, {"label": "Entretien", "value": "Lavage machine 40°C"}]),
        prod("plaid-coton-gaufre", "Plaid coton gaufré", "decoration-textile", "plaids",
             "assets/picture/texture.jpg",
             "Plaid léger en coton gaufré, pour canapé ou pied de lit.",
             "Texture gaufrée qui apporte du relief tout en restant léger, agréable toute l'année.",
             [{"label": "Matière", "value": "100% coton"}, {"label": "Format", "value": "130x180 cm"}, {"label": "Entretien", "value": "Lavage machine 40°C"}]),
        prod("plaid-maille-torsadee", "Plaid maille torsadée", "decoration-textile", "plaids",
             "assets/picture/texture.jpg",
             "Plaid plus épais en maille torsadée, esprit cocooning.",
             "Tricot texturé qui apporte du volume et une sensation cocooning en soirée.",
             [{"label": "Matière", "value": "Coton/acrylique"}, {"label": "Format", "value": "130x170 cm"}, {"label": "Entretien", "value": "Lavage machine délicat"}]),
        prod("coussin-decoratif-uni", "Coussin décoratif uni", "decoration-textile", "coussins",
             "assets/picture/conton.webp",
             "Housse de coussin unie, coloris assortis à la gamme maison.",
             "Housse zippée facile à entretenir, déclinée dans les teintes de la gamme maison.",
             [{"label": "Matière", "value": "Coton"}, {"label": "Format", "value": "40x40 / 45x45 cm"}, {"label": "Entretien", "value": "Lavage machine 30-40°C"}]),
        prod("coussin-texture-relief", "Coussin texturé à relief", "decoration-textile", "coussins",
             "assets/picture/conton.webp",
             "Coussin à motif texturé pour dynamiser un canapé ou un lit.",
             "Relief tissé qui ajoute du caractère à un intérieur épuré, sans passer par l'imprimé.",
             [{"label": "Matière", "value": "Coton"}, {"label": "Format", "value": "45x45 cm"}, {"label": "Entretien", "value": "Lavage machine 30°C"}])
    ]
}


# ---------------- SANTE ----------------
sante = {
    "section": "sante",
    "sectionLabel": "Santé & soin",
    "sectionTagline": "Des solutions fiables pour les contraintes de propreté et de renouvellement.",
    "categories": [
        {"id": "linge-medicalise", "label": "Linge médicalisé", "subcategories": [
            {"id": "draps-housse", "label": "Draps housse"},
            {"id": "aleses", "label": "Alèses"}
        ]},
        {"id": "tenues-professionnelles", "label": "Tenues professionnelles", "subcategories": [
            {"id": "blouses", "label": "Blouses"},
            {"id": "tuniques", "label": "Tuniques"}
        ]}
    ],
    "products": [
        prod("drap-housse-medicalise", "Drap housse médicalisé", "linge-medicalise", "draps-housse",
             "assets/picture/Bain.jpg",
             "Drap housse renforcé pour lits médicalisés, résistant aux lavages fréquents.",
             "Élastique renforcé et coutures solides pour supporter des cycles de lavage à haute température.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Tailles", "value": "Lits médicalisés standard"}, {"label": "Entretien", "value": "Lavage industriel 90°C"}]),
        prod("drap-housse-impermeable", "Drap housse imperméable", "linge-medicalise", "draps-housse",
             "assets/picture/Bain.jpg",
             "Version avec face imperméable pour une protection renforcée.",
             "Face technique imperméable associée à un dessus confortable, pour limiter les changes fréquents.",
             [{"label": "Matière", "value": "Coton + membrane technique"}, {"label": "Protection", "value": "Face imperméable"}, {"label": "Entretien", "value": "Lavage industriel 90°C"}]),
        prod("alese-plate-coton", "Alèse plate coton", "linge-medicalise", "aleses",
             "assets/picture/Bain.jpg",
             "Alèse de protection en coton pour usage quotidien.",
             "Complément simple et lavable pour protéger le drap housse en usage courant.",
             [{"label": "Matière", "value": "100% coton"}, {"label": "Format", "value": "90x90 cm et +"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("alese-absorbante", "Alèse absorbante renforcée", "linge-medicalise", "aleses",
             "assets/picture/Bain.jpg",
             "Alèse à pouvoir absorbant renforcé pour les besoins spécifiques.",
             "Couches absorbantes intégrées pour un meilleur confort et une protection prolongée.",
             [{"label": "Matière", "value": "Coton multicouche"}, {"label": "Absorption", "value": "Renforcée"}, {"label": "Entretien", "value": "Lavage industriel 90°C"}]),
        prod("blouse-manches-courtes", "Blouse manches courtes", "tenues-professionnelles", "blouses",
             "assets/picture/geste.jpg",
             "Blouse professionnelle manches courtes pour le personnel soignant.",
             "Coupe pratique et tissu facile d'entretien pour un usage quotidien en établissement de soin.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Tailles", "value": "XS à XXL"}, {"label": "Entretien", "value": "Lavage industriel 60-90°C"}]),
        prod("blouse-fermeture-pression", "Blouse fermeture pression", "tenues-professionnelles", "blouses",
             "assets/picture/geste.jpg",
             "Blouse à fermeture pression pour un enfilage rapide.",
             "Fermeture pression pratique pour les changements fréquents entre deux services.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Fermeture", "value": "Pressions"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("tunique-col-v", "Tunique col V", "tenues-professionnelles", "tuniques",
             "assets/picture/geste.jpg",
             "Tunique col V, coupe confortable pour la journée de travail.",
             "Coupe droite et matière respirante, pensée pour un usage prolongé en poste.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Tailles", "value": "XS à XXL"}, {"label": "Entretien", "value": "Lavage industriel 60°C"}]),
        prod("tunique-poches-multiples", "Tunique à poches multiples", "tenues-professionnelles", "tuniques",
             "assets/picture/geste.jpg",
             "Tunique avec poches supplémentaires pour le petit matériel.",
             "Poches additionnelles pratiques pour le personnel ayant besoin d'avoir du matériel à portée de main.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Poches", "value": "3 à 4"}, {"label": "Entretien", "value": "Lavage industriel"}])
    ]
}


# ---------------- EVENEMENT ----------------
evenement = {
    "section": "evenement",
    "sectionLabel": "Événement",
    "sectionTagline": "Une réponse souple aux volumes, aux échéances et aux codes de vos réceptions.",
    "categories": [
        {"id": "nappage", "label": "Nappage", "subcategories": [
            {"id": "nappes-rondes", "label": "Nappes rondes"},
            {"id": "nappes-rectangulaires", "label": "Nappes rectangulaires"}
        ]},
        {"id": "linge-de-chaise", "label": "Linge de chaise", "subcategories": [
            {"id": "housses-de-chaise", "label": "Housses de chaise"},
            {"id": "chemins-de-table", "label": "Chemins de table"}
        ]}
    ],
    "products": [
        prod("nappe-ronde-evenement", "Nappe ronde événementiel", "nappage", "nappes-rondes",
             "assets/picture/texture.jpg",
             "Nappe ronde grand format pour tables de réception.",
             "Tombé long jusqu'au sol, pensé pour une présentation soignée en réception ou mariage.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Diamètre", "value": "260 à 320 cm"}, {"label": "Entretien", "value": "Lavage + repassage industriel"}]),
        prod("nappe-ronde-couleur-evenement", "Nappe ronde couleur événementiel", "nappage", "nappes-rondes",
             "assets/picture/texture.jpg",
             "Déclinaison couleur pour s'accorder à une charte d'événement.",
             "Palette de coloris disponible pour s'harmoniser avec la décoration de la réception.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Diamètre", "value": "260 à 320 cm"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("nappe-rectangulaire-evenement", "Nappe rectangulaire événementiel", "nappage", "nappes-rectangulaires",
             "assets/picture/texture.jpg",
             "Nappe rectangulaire pour tables longues de réception ou séminaire.",
             "Format adapté aux tables rectangulaires de grande longueur, pour buffets et tables d'honneur.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Format", "value": "180x300 cm et +"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("nappage-scene-evenement", "Nappage de scène / présentoir", "nappage", "nappes-rectangulaires",
             "assets/picture/texture.jpg",
             "Nappage technique pour habiller scènes, présentoirs et tables d'exposition.",
             "Tombé structuré adapté à l'habillage de mobilier d'exposition ou de scène.",
             [{"label": "Matière", "value": "Polyester"}, {"label": "Format", "value": "Sur mesure"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("housse-chaise-extensible", "Housse de chaise extensible", "linge-de-chaise", "housses-de-chaise",
             "assets/picture/conton.webp",
             "Housse de chaise extensible, pose rapide en volume.",
             "Matière extensible qui épouse la plupart des modèles de chaises courantes en réception.",
             [{"label": "Matière", "value": "Polyester extensible"}, {"label": "Compatibilité", "value": "Chaises standard"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("housse-chaise-noeud", "Housse de chaise avec nœud", "linge-de-chaise", "housses-de-chaise",
             "assets/picture/conton.webp",
             "Housse avec nœud assorti pour une présentation plus habillée.",
             "Nœud amovible fourni séparément pour varier les couleurs selon l'événement.",
             [{"label": "Matière", "value": "Polyester"}, {"label": "Accessoire", "value": "Nœud amovible"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("chemin-de-table-uni", "Chemin de table uni", "linge-de-chaise", "chemins-de-table",
             "assets/picture/conton.webp",
             "Chemin de table pour souligner une nappe unie.",
             "Bande textile qui structure la table et met en valeur la vaisselle en réception.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Format", "value": "30x300 cm"}, {"label": "Entretien", "value": "Lavage industriel"}]),
        prod("chemin-de-table-texture", "Chemin de table texturé", "linge-de-chaise", "chemins-de-table",
             "assets/picture/conton.webp",
             "Version texturée pour une table plus habillée.",
             "Relief tissé qui apporte du caractère à une table déjà nappée en uni.",
             [{"label": "Matière", "value": "Coton/polyester"}, {"label": "Format", "value": "30x300 cm"}, {"label": "Entretien", "value": "Lavage industriel"}])
    ]
}


DATA = {
    "hotellerie": hotellerie,
    "restauration": restauration,
    "maison": maison,
    "sante": sante,
    "evenement": evenement
}


os.makedirs(OUT, exist_ok=True)
for key, val in DATA.items():
    path = os.path.join(OUT, f"products-{key}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(val, f, ensure_ascii=False, indent=2)
    print("wrote", path, len(val["products"]), "products")


sections_meta = [
    {
        "id": "hotellerie", "label": "Hôtellerie",
        "tagline": "Des gammes qui tiennent la rotation, chambre après chambre.",
        "image": "assets/picture/Chambre.webp",
        "file": "assets/data/products-hotellerie.json"
    },
    {
        "id": "restauration", "label": "Restauration",
        "tagline": "Le textile de salle et de cuisine, pensé pour l'usage intensif.",
        "image": "assets/picture/cuisine.jpg",
        "file": "assets/data/products-restauration.json"
    },
    {
        "id": "maison", "label": "Maison",
        "tagline": "Le linge de maison Fratex, pour les particuliers exigeants.",
        "image": "assets/picture/conton.webp",
        "file": "assets/data/products-maison.json"
    },
    {
        "id": "sante", "label": "Santé & soin",
        "tagline": "Des solutions fiables pour la propreté et le renouvellement.",
        "image": "assets/picture/Bain.jpg",
        "file": "assets/data/products-sante.json"
    },
    {
        "id": "evenement", "label": "Événement",
        "tagline": "Une réponse souple aux volumes et aux codes de vos réceptions.",
        "image": "assets/picture/texture.jpg",
        "file": "assets/data/products-evenement.json"
    }
]
with open(os.path.join(OUT, "sections.json"), "w", encoding="utf-8") as f:
    json.dump(sections_meta, f, ensure_ascii=False, indent=2)
print("wrote sections.json")