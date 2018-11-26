const PetService = require("../services/PetService");

const add = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const name = req.body.name;
        const ownerId = req.body.ownerId;
        const typeId = req.body.typeId;
        const favoritePet = req.body.favoritePet;
        const gender = req.body.gender;
        const branch = req.body.branch;
        const images = req.body.images;

        const data = { name, ownerId, typeId, favoritePet, gender, branch, images };

        const result = await PetService.add(data);
        return ReS(res, { result }, 200);
    } catch (error) {
        return ReE(res, error, 422);
    }
};

const get = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const pets = await PetService.get();
        return ReS(res, { pets }, 200);
    } catch (error) {
        return ReE(res, error, 422);
    }
}

const deletePet = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const id = req.body.id;
        const result = await PetService.deletePet(id);
        return ReS(res, { result }, 200);
    } catch (error) {
        return ReE(res, error, 422);
    }
}

const editPet = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const petId = req.body.petId;
        const updateOptions = req.body.updateOptions;
        const result = await PetService.editPet(petId, updateOptions);
        return ReS(res, { result }, 200);
    } catch (error) {
        return ReE(res, error, 422);
    }
}

const addFavoritePet = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const petId = req.body.petId;
        const favoriteId = req.body.favoriteId;
        const result = await PetService.addFavoritePet(petId, favoriteId);
        return ReS(res, { result }, 200);
    } catch (error) {
        return ReE(res, error, 422);
    }
}

const addIgnorePet = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const petId = req.body.petId;
        const ignorePet = req.body.ignorePet;
        const result = await PetService.addIgnorePet(petId, ignorePet);
        return ReS(res, { result }, 200);
    } catch (error) {
        return ReE(res, error, 422);
    }
}

module.exports = {
    add,
    get,
    deletePet,
    editPet,
    addFavoritePet,
    addIgnorePet,
}