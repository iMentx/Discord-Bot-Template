client.on("guildMemberAdd", (member) => {
    let roleID = db.get(`nomenadb_${member.guild.id}`)
    if(!roleID) return;
   let role = member.guild.roles.cache.find(r => r.id === roleID);
    if(!role){
       console.log("That role dosen't exist");
       return (false);
    }
    member.roles.add(role)
  })