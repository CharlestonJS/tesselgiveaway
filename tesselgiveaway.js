Entries = new Mongo.Collection("entries");

if (Meteor.isClient) {
  Template.signups.helpers({
    count: function () {
      return Entries.find().count();
    }
  });

  Template.body.events({
    "submit .new-entry": function (e) {
      e.preventDefault();

      var name = e.target.name.value;

      Entries.insert({ name: name });

      e.target.name.value = "";
    },
    "submit .pick-winner": function (e) {
      e.preventDefault();
      var entries = Entries.find().fetch();
      var choice = 0;
      // really bad prng :P
      for (var i = 0; i < entries.length; i++) {
        choice = Math.floor(Math.random() * entries.length);
      }
      var winner = entries[choice];
      e.target.winner.innerHTML = winner.name;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
