const express = require('express');
const MainService = require('../services/main.service');


const welcome = (req, res) => {
    res.send('Hello World!');
}


const gif = async (req, res) => {
    try {
        const body = req?.body;
        const data = await MainService.createGif(body);
        return res.json(data);
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const remixCreate = async (req, res) => {
    try {
        const body = req?.body;
        const data = await MainService.remixCreate(body);
        return res.json(data);
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {

    welcome,
    gif,
    remixCreate
}