const hbs = require("hbs");

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('navActive', (path, match, options) => {
  return (path === match) ? 'active' : '';
});

hbs.registerHelper('isOwnedBy', function (resource, currentUser, options) {
  if (resource.owner == currentUser.id) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper("matchGenre", function (genre, bands, options) {
  let hasBandsForGenre = bands.filter(band => band.musicalGenre === genre);

  if (hasBandsForGenre.length > 0) {
    return options.fn(hasBandsForGenre);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("musicalMatch", function (bandGenre, genre, options) {
  return bandGenre == genre ? options.fn(this) : options.inverse(this);
})

hbs.registerHelper("registerPending", function (user, band, options) {
  const pendingMembers = band.pendingMembers;
  const isPending = pendingMembers.some((pendingUser) => pendingUser == user.id);
  return isPending ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("isAdministrator", function (administrator, user, options) {
  return user.id == administrator.administrator ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("userIsInTheBand", function (user, band, options) {
  const bandMembers = band.members;
  const isInTheBand = bandMembers.some((bandMember) => bandMember.id == user.id);
  return isInTheBand ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("thisIsTheUser", function (user, member, options) {
  return user.id == member.id ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("isAdministratorInTheBand", function (administrator, members, options) {
  return members.id == administrator ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("theUserIsTheCreator", function (user, member, options) {
  return user.id == member ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("userVote", function (user, arrayUsers, options) {
  const userVote = arrayUsers.some((voteUser) => voteUser.id == user.id);
  return userVote ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('formatDate', function(date) {
  // Convertir la fecha a un objeto Date
  const eventDate = new Date(date);
  
  // Definir los nombres de los días de la semana
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Obtener el día de la semana y formatear el nombre
  const dayOfWeek = daysOfWeek[eventDate.getDay()];

  // Obtener el día, mes y año
  const day = eventDate.getDate();
  const month = eventDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
  const year = eventDate.getFullYear();

  // Obtener la hora y los minutos
  const hours = eventDate.getHours();
  const minutes = eventDate.getMinutes();

  // Formatear la fecha y hora
  const formattedDate = `${dayOfWeek} ${day}/${month}/${year} a las ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedDate;
});