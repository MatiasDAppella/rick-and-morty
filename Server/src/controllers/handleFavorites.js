let myFavorites = new Array()

const postFav = (req, res) => {
    myFavorites.push(req.body)
    return res.status(200).send(myFavorites)
};

const deleteFav = (req, res) => {
    const { id } = req.params
    myFavorites = myFavorites.filter(e => e.id !== Number(id))
    return res.status(200).send(myFavorites)
};

module.exports = {
    postFav,
    deleteFav
}