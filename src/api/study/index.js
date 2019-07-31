import ajax from '../../utils/ajax'

// 我的课程查询（上课中,未开课,已节课）
export function getCourseList(options){
  return ajax({
    url:'/api/v1.2/course/query_course',
    method: 'POST',
    option: options
  })
}

// 课程详情
export function getCourseDetail(options){
  return ajax({
    url:'/api/v1.2/class_elective/course_detail',
    method: 'POST',
    option: options
  })
}

// 课程详情
export function getUrl(options){
  return ajax({
    url:'/api/v1.2/class_elective/get_zb_url',
    method: 'POST',
    option: options
  })
}

// 我的公开课（已预约，已学习）
export function getPublicClass(options){
  return ajax({
    url:'/api/v1.2/class_elective/get_public_course',
    method: 'POST',
    option: options
  })
}
// 我的公开课 == 看回放
export function getPublicUrl(options){
  return ajax({
    url:'/api/v1.2/public_course_student/is_user_appointment_public_course',
    method: 'POST',
    option: options
  })
}
