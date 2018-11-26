exports.PARSE_TIMESTAMP = async function(req, res, next) {
  const date = {
    "unix": null,
    "natural": null
  };
  
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const path = decodeURIComponent(req.path.substring(1, req.path.length));
  if(isNaN(path)){
    const unixDate = Date.parse(path) / 1000;
    if(!isNaN(unixDate)){
      date.unix = unixDate;
      date.natural = path;
    }
  }
  else {
    const naturalDate = new Date(parseInt(path) * 1000); //Does not throw error
    //Check if creating date was successful
    if(!isNaN(naturalDate.getTime())){
      date.unix = path;
      date.natural = month[naturalDate.getMonth()] + " "
       + naturalDate.getDate() + ", " + naturalDate.getFullYear();
    }
  }

  if(date.natural){
    res.send(date);
  } else {
    next({status: 500, message: 'Invalid date'});
  }
};
