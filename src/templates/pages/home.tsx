import { Html } from '@elysiajs/html';
import { FeatureCard } from '../components/feature-card.js';

const fieldOfDaffodilsImage = '/static/images/wallpapers/field_of_daffodils_gpt.png';

export const homePage = () => (
	<>
		<div class="hero-parallax home-hero">
			<div class="hero-parallax-bg"></div>
			<div class="hero-content">
				<div class="hero-badge" style="backdrop-filter: blur(12px); box-shadow: 0 4px 20px rgba(201, 122, 88, 0.15);">
					<i data-lucide="sparkles" class="icon-small"></i>
					<span>Spring 2026</span>
				</div>
				<h1>Welcome to March</h1>
				<p class="hero-tagline">
					Discover the joy, celebrations, and activities that make this month truly special
				</p>
				<div class="hero-actions">
					<a href="/holidays" class="btn btn-primary btn-lg">
						<i data-lucide="calendar-days" aria-hidden="true"></i> Explore Holidays
					</a>
					<a href="/plans" class="btn btn-outline btn-lg">
						<i data-lucide="layout-list" aria-hidden="true"></i> My Plans
					</a>
				</div>
			</div>
			<div class="hero-scroll">
				<div class="scroll-indicator">
					<i data-lucide="chevrons-down" aria-hidden="true"></i>
				</div>
			</div>
		</div>

		<div class="about-card home-about">
			<div class="about-header">
				<h2>
					<i data-lucide="flower-2" class="icon-inline icon-primary"></i> About March
				</h2>
			</div>
			<div class="about-content">
				<div class="about-text">
					<p class="text-lg about-lead">
						March slips in like a quiet promise: frost retreating, light stretching, earth 
						waking under your feet.
					</p>
					<p class="text-lg">
						Once dedicated to <strong>Mars</strong>, the spear-wielding god of war, it now 
						carries gentler banners—celebration, renewal, the hush of seedlings pushing 
						through thawed soil.
					</p>
					<p class="text-lg">
						Walk through these thirty-one days and you'll bump into toasts everywhere. Green 
						rivers of parades honor Irish ancestry; brilliant voices rise for International 
						Women's Day; math geeks circle their favorite constant on Pi Day; and somewhere 
						a fresh tray of cookies cools beside a glass of milk.
					</p>
				</div>
				<div class="about-image">
					<a>
						<img
							src={fieldOfDaffodilsImage}
							alt="Field of daffodils - Mathew Kennedy-Brewer's March celebration"
							data-title="Field of daffodils - Mathew Kennedy-Brewer's March celebration"
							class="float-img clickable-image"
						/>
					</a>
				</div>
			</div>
		</div>

		<div class="home-features">
			<h2 class="features-title">
				<i data-lucide="compass" class="icon-inline icon-primary"></i> Start Your Journey
			</h2>
			<p class="features-subtitle">Everything you need to make this March memorable</p>
			
			<div class="cards-grid home-cards">
				<FeatureCard
					icon="calendar-days"
					title="Holidays & Events"
					description="Explore the many celebrations happening throughout March—from St. Patrick's Day to Pi Day."
					href="/holidays"
					linkText="View all holidays"
				/>

				<FeatureCard
					icon="compass"
					title="My Journey"
					description="Create your celebration profile and discover your unique March personality."
					href="/profile"
					linkText="Set up profile"
				/>

				<FeatureCard
					icon="layout-list"
					title="My Plans"
					description="Track your March goals and plan your celebrations with personalized plans."
					href="/plans"
					linkText="Start planning"
				/>

				<FeatureCard
					icon="lightbulb"
					title="Tips & Ideas"
					description="Get inspired with celebration ideas, traditions, and creative suggestions."
					href="/tips"
					linkText="Get inspired"
				/>
			</div>
		</div>

		<div class="home-quote" style="box-shadow: 0 8px 30px rgba(201, 122, 88, 0.12);">
			<blockquote>
				<i data-lucide="quote" class="quote-icon-left"></i>
				<p class="quote-text">March is the month of expectation.</p>
				<cite class="quote-author">— Emily Dickinson</cite>
			</blockquote>
		</div>

		<div class="march-goals home-march-goals">
			<div class="goals-header">
				<div class="goals-icon-ring">
					<i data-lucide="target"></i>
				</div>
				<h3>March Goals</h3>
				<p class="goals-subtitle">Make this month count</p>
			</div>
			<div class="goals-grid">
				<div class="goal-item">
					<div class="goal-check">
						<i data-lucide="check"></i>
					</div>
					<span class="goal-text">Explore all March holidays and events</span>
				</div>
				<div class="goal-item">
					<div class="goal-check">
						<i data-lucide="check"></i>
					</div>
					<span class="goal-text">Create your personalized celebration profile</span>
				</div>
				<div class="goal-item">
					<div class="goal-check">
						<i data-lucide="check"></i>
					</div>
					<span class="goal-text">Plan and track your March adventures</span>
				</div>
				<div class="goal-item">
					<div class="goal-check">
						<i data-lucide="check"></i>
					</div>
					<span class="goal-text">Discover new traditions and celebration ideas</span>
				</div>
			</div>
		</div>

		<style>{`
			@keyframes bounce {
				0%, 100% { transform: translateX(-50%) translateY(0); }
				50% { transform: translateX(-50%) translateY(10px); }
			}
		`}</style>
	</>
);
