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

hbs.registerHelper("registerPending", function (user, band, options) {
  const pendingMembers = band.pendingMembers;
  const isPending = pendingMembers.some((pendingUser) => pendingUser == user.id);
  return isPending ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("isAdministrator", function (administrator, user, options) {
  return user.id == administrator.administrator ? options.fn(this) : options.inverse(this);
});

// hbs.registerHelper("userIsInTheBand", function (user, band, options) {
//   const bandMembers = band.members;
//   const bandAdministrator = band.administrator
//   const isInTheBand = bandMembers.some((bandMember) => bandMember.id == user.id);
//   const isAdministrator = bandAdministrator == user.id;
//   return isInTheBand || isAdministrator ? options.fn(this) : options.inverse(this)
// });

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