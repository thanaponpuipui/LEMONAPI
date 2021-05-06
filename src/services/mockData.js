const fetchSpecificData = {
  _id: "00",
  parties: 2,
  details: [
    {
      party: 1,
      details: [
        {
          _id: "001",
          name: "RAMEN_NO_PORK",
          amount: 1,
          price: 10,
          extra: "NO_SALIM",
        },
        {
          _id: "002",
          name: "RED_SUBMARINE",
          amount: 1,
          price: 10,
          extra: "EXTRA_SALTY",
        },
      ],
    },
    {
      party: 2,
      details: [
        {
          _id: "002",
          name: "RED_SUBMARINE",
          amount: 1,
          price: 10,
          extra: "EXTRA_SALTY",
          party: 2,
        },
      ],
    },
  ],
};
module.exports = fetchSpecificData;