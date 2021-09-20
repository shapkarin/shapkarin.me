const formatEvent = (event) => {
  const types = {
    IssueCommentEvent: '',
    IssuesEvent: ''
  }
)

const formatAll = (list) => list.map(event => formatEvent(event))