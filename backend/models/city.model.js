import mongoose from "mongoose";

// {
//     "cityName": "Rome",
//     "country": "Italy",
//     "emoji": "🇮🇹",
//     "date": "2024-07-06T07:33:00.865Z",
//     "notes": "rome :)",
//     "position": {
//       "lat": "41.890085343879406",
//       "lng": "12.505198683712752"
//     },
//     "id": 1
//   },

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  emoji: {
    type: String,
  },
  date: {
    type: String,
  },
  notes: {
    type: String,
  },
  position: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const City = mongoose.model("City", citySchema);
export default City;
