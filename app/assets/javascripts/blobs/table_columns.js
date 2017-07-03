var Blobs = Blobs || {};

Blobs.StandardTableColumns = [
  {
    header: "Identifier",
    renderCell: function(participant) {return participant.external_identifier},
    sortBy: function(participant) {return participant.external_identifier},
  },
  {
    header: "Name",
    renderCell: function(participant) {return participant.last_name + ", " + participant.first_name},
    sortBy: function(participant) {return participant.last_name},
  },
  {
    header: "Age",
    renderCell: function(participant) {return participant.age},
    sortBy: function(participant) {return participant.age},
  },
  {
    header: "Siblings",
    renderCell: function(participant) {return participant.has_siblings ? "Yes" : "No"},
    sortBy: function(participant) {return participant.has_siblings}
  },
  {
    header: "Known environmental exposures",
    renderCell: function(participant) {return participant.environmental_exposures}
  },
  {
    header: "Known genetic mutations",
    renderCell: function(participant) {return participant.genetic_mutations}
  },
];
