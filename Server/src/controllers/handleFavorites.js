let myFavorites = new Array()

const postFav = (req, res) => {
    myFavorites.push(req.body)
    return res.status(200).send(JSON.stringify(myFavorites))
};

const deleteFav = (req, res) => {
    const { id } = req.params
    myFavorites = myFavorites.filter(e => e.id !== id)
    return res.status(200).send(JSON.stringify(myFavorites))
};

module.exports = {
    postFav,
    deleteFav
}