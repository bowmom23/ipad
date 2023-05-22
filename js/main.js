//장바구니
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event){
  //stopPropagation 매소드는 현재 이벤트까지만 진행(이벤트 전파가 되지 않도록 함)(아래 window 까지 가지 않는다.)
  event.stopPropagation()
  //contains는 해당 show라는 클래스가 포함되어 있는지 확인하는 메소드
  //false & true 
  if (basketEl.classList.contains('show')){
    //hide "show" 라는 클래스를 삭제해라.
    hideBasket()
  } else {
    //show "show" 라는 클래스를 추가하라.
    showBasket()
  }
})

basketEl.addEventListener('click', function(event){
  event.stopPropagation()
})

window.addEventListener('click', function(){
  hideBasket()
})

function showBasket(){
  basketEl.classList.add('show')
}
function hideBasket(){
  basketEl.classList.remove('show')
}

//검색
const headerEl = document.querySelector('header')
//[...]전개 연산자 : 반환된 내용을 해체한 후 대괄호[]로 묶었기 때문에 배열로 관리된다.
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click',showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch(){
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  //순차적으로 항목이 사라지는 애니메이션을 추가하기 위한 코드 (아래)
  headerMenuEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  //검색바가 노출할 때 검색바에 포커스 되야 한다. 
  //단, 애니메이션이 끝난 뒤 검색바가 포커스 되야 하므로 css 상 설정한 0.6초 뒤로 해당 매소드가 실행되게 하는 settimeout 메소드 실행 후 포커스를 실행한다.
  setTimeout(function(){
    searchInputEl.focus()
  }, 600)
}
function hideSearch(){
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  //검색바가 사라질 때 입력한 값 초기화 (아래)
  searchInputEl.value = ''
}

//요소의 가시성 관찰 (어렵다 ㅠㅠ 이건 무슨 말인지 모르겠어)
const io = new IntersectionObserver(function (entries){
  entries.forEach(function (entry){
    if(!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})

// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})