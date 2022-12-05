# logiquement de déploiement
## Déploiement initial
1 > marketplace
2 > DAO
3 > Factory 

## manip usecase
Factory : Ajout address DAO à contract factory --> OK automatisé
Factory : Création nouvelle collection (création collection 1155 + 721 + DAO toutes avec le meme id)
DAO : Creation d’une proposal de mint dans une DAO 
DAO : Vote de la proposal par une address
PROPERTY : récupération du contrat nftProperty déployé à l’address de la nouvelle collection
PROPERTY : ajout addresse DAO au contrat nftProperty
PROPERTY : mint d’un objet
PROPERTY : ajout approval pour la marketplace par le vendeur
MARKETPLACE : mise en vente objet
MARKETPLACE : achat de l’objet par un autre compte
