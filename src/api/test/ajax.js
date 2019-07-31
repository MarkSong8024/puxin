import ajax from 'utils/ajax'
export function getClassList(options) {
  return ajax({
    url: '/api/class/list_class/',
    method: 'POST',//默认是get
    option: options
  })
}

