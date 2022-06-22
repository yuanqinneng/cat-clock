export default class draw {
    constructor(id) {
        this.id = id;
        this.ctx = document.getElementById(this.id).getContext('2d');
        this.width = document.getElementById(this.id).getAttribute('width');
        this.height = document.getElementById(this.id).getAttribute('height');
        this.PI = Math.PI;
        this.r = 200;
    }
    init() {
        let bgImg = new Image();
        bgImg.src = './imgs/cat.png';
        bgImg.onload = () => {
            setInterval(() => {
                this.draw(this.ctx, bgImg);
            }, 1000);
        };
    }
    draw(ctx, bgImg) {
        ctx.save();
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.translate(this.width / 2, this.height / 2);
        ctx.drawImage(bgImg, -this.r * 0.7, -this.r * 0.8);
        ctx.save();

        this.drawArc(ctx);
        this.drawNeedle(ctx);
        this.drawScale(ctx);
        this.drawNumber(ctx);

        ctx.restore();
        ctx.restore();
    }
    // 绘画圆圈
    drawArc(ctx) {
        this.process(ctx, () => {
            ctx.arc(0, 0, 10, 0, 2 * this.PI, false);
            ctx.fillStyle = '#000';
            ctx.fill();
        });
        this.process(ctx, () => {
            ctx.arc(0, 0, this.r, 0, 2 * this.PI, false);
            ctx.lineWidth = 10;
            ctx.stroke();
        });
    }
    // 绘画时、分、秒针
    drawNeedle(ctx) {
        let time = new Date();
        let hour = time.getHours() % 12;
        let min = time.getMinutes();
        let sec = time.getSeconds();

        this.process(ctx, () => {
            ctx.rotate(
                ((2 * this.PI) / 12) * hour + ((2 * this.PI) / 12) * (min / 60) - this.PI / 2
            );
            ctx.moveTo(-30, 0);
            ctx.lineTo(60, 0);
            ctx.lineWidth = 10;
            ctx.stroke();
        });

        this.process(ctx, () => {
            ctx.rotate(
                ((2 * this.PI) / 60) * min + ((2 * this.PI) / 60) * (sec / 60) - this.PI / 2
            );
            ctx.moveTo(-40, 0);
            ctx.lineTo(80, 0);
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
        });

        this.process(ctx, () => {
            ctx.rotate(((2 * this.PI) / 60) * sec - this.PI / 2);
            ctx.moveTo(-60, 0);
            ctx.lineTo(100, 0);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        });
    }
    // 绘画刻度
    drawScale(ctx) {
        this.process(ctx, () => {
            ctx.lineWidth = 1;
            for (let i = 0; i < 60; i++) {
                ctx.rotate((2 * this.PI) / 60);
                ctx.beginPath();
                ctx.moveTo(this.r - 10, 0);
                ctx.lineTo(this.r, 0);
                ctx.stroke();
                ctx.closePath();
            }
        });
        this.process(ctx, () => {
            ctx.lineWidth = 5;
            for (let i = 0; i < 12; i++) {
                ctx.rotate((2 * this.PI) / 12);
                ctx.beginPath();
                ctx.moveTo(this.r - 20, 0);
                ctx.lineTo(this.r, 0);
                ctx.stroke();
                ctx.closePath();
            }
        });
    }
    // 绘画数字
    drawNumber(ctx) {
        this.process(ctx, () => {
            let num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
            for (let i = 0; i < 12; i++) {
                ctx.beginPath();
                var rad = ((2 * this.PI) / 12) * i;
                var x = Math.cos(rad) * (this.r - 40);
                var y = Math.sin(rad) * (this.r - 40);
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.font = '20px Georgia';
                ctx.fillText(num[i], x, y);
                ctx.closePath();
            }
        });
    }
    process(ctx, fn) {
        ctx.beginPath();
        fn();
        ctx.closePath();
        ctx.restore();
        ctx.save();
    }
}
