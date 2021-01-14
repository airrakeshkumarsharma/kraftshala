/**
 * Get users necessary data from the data for specific work
 * @param includeFunctions function need to execute
 */
const build = (includeFunctions: any[]) => {
  let projection = {};

  if (includeFunctions) {
    if (includeFunctions.length > 0) {
      for (const fun of includeFunctions) {
        projection = {
          ...projection,
          ...mapFunction(fun)
        };
      }
    }
  }

  /* Final Security Resort to make sure projection is not {} */
  if (Object.keys(projection).length === 0) {
    projection = { ...basic() };
  }
  return projection;
};

/* Mapping projection function strings to projection function */
const mapFunction = (fun: any) => {
  switch (fun) {
    case "basic":
      return basic();
    case "minimal":
      return minimal();
    case "internal":
      return internal();
  }
};

/**
 * Basic projection can be used for
 * read-many case
 */
function basic() {
  return {
    assignmentId: 1,
    instructorId: 1,
    studentId: 1,
    solutionPdf: 1,
    isSubmitted: 1,
    submittedAt: 1,
    "student.name": 1,
    "student.email": 1,
    "instructor.name": 1,
    "instructor.email": 1,
    "assignmentDetails.title": 1,
    "assignmentDetails.subject": 1,
    "assignmentDetails.question": 1,
    "assignmentDetails.deadline": 1
  };
}

/**
 * Minimal Can be used for
 * Read-many So more details option can be seen by the client
 */
function minimal() {
  return {
    createdAt: 1,
    updatedAt: 1
  };
}

/**
 * All Sensitive Data which can seen by the
 * admin
 * data owner
 */
function internal() {
  return {};
}

export { build as assignmentProjection };
