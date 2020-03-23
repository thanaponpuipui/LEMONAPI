module.exports.userVerifier = db => username => {
  const query = {
    text: 'SELECT * FROM accounts where login_name = $1',
    values: [username],
  };
  return db.query(query).then(({ rows }) => {
    if (rows[0]) return rows[0];
    return false;
  });
};
