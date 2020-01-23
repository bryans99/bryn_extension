project_name: "bryn_extension"

# # Use local_dependency: To enable referencing of another project
# # on this instance with include: statements
#
# local_dependency: {
#   project: "name_of_other_project"
# }

#application: sidebar_prototype {
#  label: "Sidebar Prototype"
#  file: "sidebar_prototype.js"
#}

#application: flow_prototype {
#  label: "Flow Prototype"
#  file: "flow_prototype.js"
#}

# if label ommitted does not appear in drop down menu
# bit of a hack at the moment
application: hello {
  file: "hello.js"
}
