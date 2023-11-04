import { Router } from 'express';
import { usersManager } from '../managers/usersManager.js';
import { hashData, compareData } from '../utils.js';

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userFound = await usersManager.findByEmail(email);
    if (!userFound) {
        return res.json({ error: "Email o contraseña incorrecto" });
    }
    const comparePass = await compareData(password, userFound.password);
    if (!comparePass) {
        return res.json({ error: "Email o contraseña incorrecto" });
    }
    req.session["email"] = email;
    req.session["first_name"] = userFound.first_name;
    req.session["last_name"] = userFound.last_name;
    req.session["isAdmin"] = email === "adminCoder@coder.com" && password === "adminCod3r123" ? true : false;
    res.redirect("/products");

})

router.post("/signup", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password ) {
        return res.status(400).json({ error: "Todos los campos deben ser completados"});
    }
    const hashedPass = await hashData(password);
    const createdUser = await usersManager.createOne({ ...req.body, password: hashedPass });
    if(!createdUser) {
        res.redirect("/signup");
    }
    res.status(200).redirect("/");
})

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
})

export default router;