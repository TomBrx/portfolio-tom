function toggleSection(element) {
            // Fermer toutes les autres sections
            const allSections = document.querySelectorAll('.section-button');
            allSections.forEach(section => {
                if (section !== element) {
                    section.classList.remove('expanded');
                }
            });

            // Toggle la section cliquée
            element.classList.toggle('expanded');
        }

        // Empêcher la propagation du clic sur les liens
        document.addEventListener('click', function(e) {
            if (e.target.closest('.project-link') || e.target.closest('.download-link')) {
                e.stopPropagation();
            }
        });

        // Système de particules interactives
        class ParticleSystem {
            constructor() {
                this.canvas = document.getElementById('particleCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.mouse = { x: 0, y: 0 };
                this.maxParticles = 80;
                
                this.init();
            }
            
            init() {
                this.resizeCanvas();
                this.createParticles();
                this.bindEvents();
                this.animate();
            }
            
            resizeCanvas() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
            
            createParticles() {
                for (let i = 0; i < this.maxParticles; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        radius: Math.random() * 2 + 1,
                        opacity: Math.random() * 0.5 + 0.2,
                        originalRadius: Math.random() * 2 + 1
                    });
                }
            }
            
            bindEvents() {
                window.addEventListener('resize', () => this.resizeCanvas());
                
                document.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                });
                
                document.addEventListener('mouseleave', () => {
                    this.mouse.x = -999;
                    this.mouse.y = -999;
                });
            }
            
            updateParticles() {
                this.particles.forEach(particle => {
                    // Mouvement normal
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Rebond sur les bords
                    if (particle.x < 0 || particle.x > this.canvas.width) {
                        particle.vx *= -1;
                    }
                    if (particle.y < 0 || particle.y > this.canvas.height) {
                        particle.vy *= -1;
                    }
                    
                    // Interaction avec la souris
                    const dx = this.mouse.x - particle.x;
                    const dy = this.mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        particle.x -= dx * force * 0.01;
                        particle.y -= dy * force * 0.01;
                        particle.radius = particle.originalRadius * (1 + force * 0.5);
                        particle.opacity = Math.min(1, particle.opacity + force * 0.3);
                    } else {
                        particle.radius = particle.originalRadius;
                        particle.opacity = Math.max(0.2, particle.opacity - 0.02);
                    }
                });
            }
            
            drawParticles() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.particles.forEach(particle => {
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                    this.ctx.fill();
                });
                
                // Dessiner les connexions
                this.drawConnections();
            }
            
            drawConnections() {
                this.particles.forEach((particle, i) => {
                    this.particles.slice(i + 1).forEach(otherParticle => {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 120) {
                            const opacity = (120 - distance) / 120 * 0.3;
                            this.ctx.beginPath();
                            this.ctx.moveTo(particle.x, particle.y);
                            this.ctx.lineTo(otherParticle.x, otherParticle.y);
                            this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                            this.ctx.lineWidth = 0.5;
                            this.ctx.stroke();
                        }
                    });
                });
            }
            
            animate() {
                this.updateParticles();
                this.drawParticles();
                requestAnimationFrame(() => this.animate());
            }
        }
        
        // Initialiser le système de particules au chargement
        document.addEventListener('DOMContentLoaded', () => {
            new ParticleSystem();
        });