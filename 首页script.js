// 购物车数据（基础变量声明）
var cart = [];

// DOM加载完成后执行（基础事件监听）
document.addEventListener('DOMContentLoaded', function() {
    backtologin();
    initSlider();
    initCountdown();
    initCart();
    initBackToTop();
    initNavScroll();
});
function backtologin(){
var login=document.querySelector('.fa-user')
var registration=document.querySelector('.regis')
if(localStorage.getItem('username')){
    registration.style.display='none'
    login.innerHTML=localStorage.getItem('username')
    login.addEventListener('click',function(){
    localStorage.removeItem('username')
    window.location.href='./index.html'
    })
}
else{
login.innerHTML='登录'
login.addEventListener('click',function(){
window.location.href='./index.html'; } )

registration.addEventListener('click',function(){
window.location.href='./index.html' ;
    })
}

}
// 轮播图功能
function initSlider() {
    var slidesContainer = document.querySelector('.slides-container');
    var slides = document.querySelectorAll('.slide');
    var prevBtn = document.querySelector('.prev-btn');
    var nextBtn = document.querySelector('.next-btn');
    var dots = document.querySelectorAll('.dot');
    
    var currentIndex = 0;
    var slideCount = slides.length;
    var autoPlayInterval;
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        currentIndex = index;
        
        slidesContainer.style.transform = 'translateX(-' + (currentIndex * 100 / slideCount) + '%)';
        
        
        for (var i = 0; i < dots.length; i++) {
            var dot = dots[i];
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        }
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 按钮点击事件
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // 指示器点击事件
    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        // 用闭包保存当前索引（基础写法）
        (function(index) {
            dot.addEventListener('click', function() {
                goToSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        })(i);
    }
    
    // 鼠标悬停事件
    var slider = document.querySelector('.banner-slider');
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    
    startAutoPlay();
}

// 倒计时功能
function initCountdown() {
    
    function padZero(num) {
        return num < 10 ? '0' + num : num.toString();
    }
    
    var endTime = new Date().getTime() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000;
    
    function updateCountdown() {
        var now = new Date().getTime();
        var distance = endTime - now;
        
        if (distance < 0) {
            endTime = new Date().getTime() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000;
            return;
        }
        
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        
        document.getElementById('hours').textContent = padZero(hours);
        document.getElementById('minutes').textContent = padZero(minutes);
        document.getElementById('seconds').textContent = padZero(seconds);
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 购物车功能
function initCart() {
    var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    var cartCountElements = document.querySelectorAll('.cart-count');
    
    // 更新购物车数量
    function updateCartCount() {
        var totalCount = 0;
        for (var i = 0; i < cart.length; i++) {
            totalCount += cart[i].quantity;
        }
        
        
        for (var j = 0; j < cartCountElements.length; j++) {
            var element = cartCountElements[j];
            element.textContent = totalCount;
        }
    }
    
    // 添加商品到购物车
    function addToCart(productId, productName, productPrice) {
        var existingItem = null;
        // 基础for循环查找商品
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id === productId) {
                existingItem = cart[i];
                break;
            }
        }
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        updateCartCount();
        // 字符串拼接代替模板字符串
        alert('"' + productName + '" 已加入购物车！');
    }
    
    
    // 为所有按钮添加事件
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', function() {
            var productId = this.getAttribute('data-id');
            var productName = this.getAttribute('data-name');
            var productPrice = parseFloat(this.getAttribute('data-price'));
            
            addToCart(productId, productName, productPrice);
        });
    }
    
    updateCartCount();
}

// 回到顶部功能
function initBackToTop() {
    var backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

