var getUser= (id, callback)=> {
  var user= {
    id: id,
    name: 'waris'
  };
  setTimeout(()=> {
    callback(user)
  }, 3000)
};

var callingBack= (userObj)=> {
  console.log(userObj);
}
getUser(13, callingBack)
