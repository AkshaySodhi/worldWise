import City from "../models/city.model.js";
import List from "../models/list.model.js";
import User from "../models/user.model.js";

// const newCity = {
//   cityName,
//   country,
//   emoji,
//   date,
//   notes,
//   position: { lat, lng },

export const addCity = async (req, res) => {
  try {
    const { cityName, country, emoji, date, notes, position } = req.body;
    const userId = req.user._id;

    let list = await List.findOne({ owner: userId });
    if (!list) {
      list = await List.create({ owner: userId });
    }

    const newCity = new City({
      cityName,
      country,
      emoji,
      date,
      notes,
      position,
    });

    if (newCity) {
      list.cities.push(newCity._id);
      Promise.all([newCity.save(), list.save()]);
      res.status(201).json(newCity);
    } else {
      res.status(400).json({ error: "invalid city data" });
    }
  } catch (err) {
    console.error("error in addcity contrll", err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getCities = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const list = await List.findOne({ owner: userId }).populate("cities");
    if (!list) return res.status(200).json([]);

    const cities = list.cities;
    res.status(200).json(cities);
  } catch (err) {
    console.error("error in getcities contrll", err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getCity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: cityId } = req.params;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const city = await City.findById({ _id: cityId });
    res.status(200).json(city);
  } catch (err) {
    console.error("error in getcity contrll", err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const removeCity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: cityId } = req.params;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    await City.findByIdAndDelete({ _id: cityId });
    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.error("error in rem contrll", err);
    res.status(500).json({ error: "internal server error" });
  }
};
