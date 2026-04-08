"use client";

import React from "react";

// ═══════════════════════════════════════════════════
// MEME DATA - 64 total across 3 stages
// ═══════════════════════════════════════════════════

const memes = [
  // ───────────────────────────────────────
  // STAGE 1: AWAKENING (22 memes)
  // ───────────────────────────────────────
  { stage:1, id:"teacher-vs-influencer", render:()=>(
    <C bg="#0a0a0a" font="mono">
      <Top>The economy can count</Top>
      <Row2>
        <Half br><Big e="📱"/><Num c="#ff4444">$4.2M</Num><Sub>dancing on camera</Sub></Half>
        <Half><Big e="🤲"/><Num c="#333">$0</Num><Sub>holding a dying woman's<br/>hand at 3 AM</Sub></Half>
      </Row2>
      <Punch>The measuring stick is broken.</Punch>
    </C>
  )},
  { stage:1, id:"mom-gdp", render:()=>(
    <C bg="linear-gradient(180deg,#faf8f5,#f0ebe4)" font="serif" dark>
      <Top dark>A Mother's Day</Top>
      <div style={{flex:1,display:"flex",padding:"0 28px"}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:"3px"}}>
          {[["5:30 AM","Wake before everyone"],["6:00 AM","Pack lunches"],["7:00 AM","Dress kids, manage meltdowns"],["8:00 AM","School drop-off"],["9:00 AM","Clean, laundry, groceries"],["12:00 PM","Pay bills, schedule doctor"],["2:30 PM","Pick up, homework help"],["4:00 PM","Drive to practice"],["5:30 PM","Cook dinner"],["7:00 PM","Baths, stories, bedtime"],["9:00 PM","Prep for tomorrow"],["10:30 PM","Collapse"]].map(([t,d])=>(
            <div key={t} style={{display:"flex",gap:"12px",fontSize:"12px",lineHeight:1.6}}>
              <span style={{color:"#aaa",fontFamily:"'Courier New',monospace",fontSize:"10px",minWidth:"58px"}}>{t}</span>
              <span style={{color:"#444"}}>{d}</span>
            </div>
          ))}
        </div>
        <div style={{width:"120px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderLeft:"1px solid #ddd",paddingLeft:"20px"}}>
          <div style={{fontSize:"10px",letterSpacing:"2px",color:"#bbb",textTransform:"uppercase",marginBottom:"8px"}}>GDP<br/>Contribution</div>
          <div style={{fontSize:"64px",fontWeight:"bold",color:"#ccc"}}>$0</div>
        </div>
      </div>
      <Punch dark>If the ledger can't see her, the ledger is wrong.</Punch>
    </C>
  )},
  { stage:1, id:"grandma-vs-you", render:()=>(
    <C bg="#111" font="mono">
      <Top>Same savings. Different century.</Top>
      <Mid gap="32px">
        <div><Yr>1970</Yr><div style={{display:"flex",alignItems:"baseline",gap:"16px"}}><span style={{fontSize:"42px",color:"#d4af37",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>$20,000</span><span style={{fontSize:"14px",color:"#888"}}>=</span><span style={{fontSize:"20px",color:"#d4af37"}}>🏠</span><span style={{fontSize:"16px",color:"#aaa",fontFamily:"'Georgia',serif"}}>a house</span></div></div>
        <div style={{height:"1px",background:"#222"}}/>
        <div><Yr>2025</Yr><div style={{display:"flex",alignItems:"baseline",gap:"16px"}}><span style={{fontSize:"42px",color:"#555",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>$20,000</span><span style={{fontSize:"14px",color:"#888"}}>=</span><span style={{fontSize:"16px",color:"#555",fontFamily:"'Georgia',serif"}}>4 months rent</span></div></div>
      </Mid>
      <Punch>The money didn't change. The money was changed.</Punch>
    </C>
  )},
  { stage:1, id:"king-vs-fed", render:()=>(
    <C bg="#f5f0e8" font="serif" dark>
      <Top dark>A brief history of the same trick</Top>
      <Row2>
        <Half br dark><Big e="👑"/><BoldT dark>300 AD</BoldT><Sub dark>Clip the coins.<br/>Mix in cheap metal.<br/>Hope nobody notices.</Sub></Half>
        <Half dark><Big e="🏛️"/><BoldT dark>2025 AD</BoldT><Sub dark>Print more dollars.<br/>Call it "stimulus."<br/>Hope nobody notices.</Sub></Half>
      </Row2>
      <Punch dark>Same trick. Better graphics.</Punch>
    </C>
  )},
  { stage:1, id:"ai-jobs", render:()=>(
    <C bg="#0b0b0f" font="mono">
      <Mid gap="28px">
        <IconRow e="🤖" t="Cost to produce: $0" s="GDP goes up" c="#00ff88"/>
        <IconRow e="👨‍👩‍👧‍👦" t="Jobs lost: millions" s="GDP doesn't care" c="#ff4444"/>
        <IconRow e="📈" t="Gains: machine owners" s="As designed" c="#888"/>
      </Mid>
      <Punch>The technology isn't the problem. Where it's aimed is.</Punch>
    </C>
  )},
  { stage:1, id:"your-1440", render:()=>(
    <C bg="#0a0a0a" font="serif" center>
      <div style={{fontSize:"11px",letterSpacing:"4px",color:"#555",textTransform:"uppercase",fontFamily:"'Courier New',monospace",marginBottom:"32px"}}>Every day you wake up with</div>
      <div style={{fontSize:"90px",color:"#fff",fontWeight:"bold",lineHeight:1}}>1,440</div>
      <div style={{fontSize:"20px",color:"#666",marginTop:"8px"}}>minutes</div>
      <div style={{width:"60px",height:"1px",background:"#222",margin:"28px 0"}}/>
      <div style={{fontSize:"16px",color:"#ff4444",textAlign:"center",lineHeight:1.6}}>Right now, someone else<br/>is monetizing every one of them.</div>
    </C>
  )},
  // NEW S1 memes
  { stage:1, id:"teacher-salary", render:()=>(
    <C bg="#0a0a0a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"24px"}}>Average salary comparison</div>
      <div style={{display:"flex",flexDirection:"column",gap:"12px",width:"100%",maxWidth:"320px"}}>
        {[["Hedge fund manager","$2,400,000","100%","#ff4444"],["Social media manager","$72,000","3%","#f7931a"],["Teacher","$48,000","2%","#666"],["Home care aide","$31,000","1.3%","#444"]].map(([role,sal,pct,c])=>(
          <div key={role}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}><span style={{color:"#888",fontSize:"12px",fontFamily:"'Georgia',serif"}}>{role}</span><span style={{color:c,fontSize:"12px",fontWeight:"bold"}}>{sal}</span></div>
            <div style={{height:"8px",background:"#1a1a1a",borderRadius:"4px",overflow:"hidden"}}><div style={{width:pct,height:"100%",background:c,borderRadius:"4px"}}/></div>
          </div>
        ))}
      </div>
      <Punch>The people holding society together<br/>are the ones it pays the least.</Punch>
    </C>
  )},
  { stage:1, id:"fiat-graveyard", render:()=>(
    <C bg="#111" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"20px"}}>Every fiat currency in history</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px",width:"100%",maxWidth:"320px"}}>
        {["Roman Denarius","Spanish Real","French Livre","Dutch Guilder","German Mark","Zimbabwe Dollar","Venezuelan Bolívar","Argentine Peso","US Dollar?"].map((c,i)=>(
          <div key={c} style={{padding:"10px 6px",background:i===8?"rgba(255,68,68,0.1)":"rgba(255,255,255,0.03)",border:i===8?"1px solid #ff4444":"1px solid #1a1a1a",borderRadius:"6px",textAlign:"center"}}>
            <div style={{fontSize:i===8?24:20}}>{i===8?"⏳":"💀"}</div>
            <div style={{fontSize:"9px",color:i===8?"#ff4444":"#555",marginTop:"4px"}}>{c}</div>
          </div>
        ))}
      </div>
      <Punch>Average lifespan: 27 years.<br/>None have survived. None.</Punch>
    </C>
  )},
  { stage:1, id:"invisible-work", render:()=>(
    <C bg="#0a0a0a" font="serif" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",fontFamily:"'Courier New',monospace",marginBottom:"28px"}}>Economically invisible</div>
      <div style={{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"280px"}}>
        {["Raising children","Caring for elderly parents","Mentoring a teenager","Maintaining a community garden","Comforting a grieving friend","Teaching your kid to read"].map(w=>(
          <div key={w} style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #1a1a1a",paddingBottom:"8px"}}>
            <span style={{color:"#888",fontSize:"14px"}}>{w}</span>
            <span style={{color:"#333",fontSize:"14px",fontWeight:"bold"}}>$0</span>
          </div>
        ))}
      </div>
      <Punch>If the economy can't see the work that holds<br/>society together, the economy is blind.</Punch>
    </C>
  )},
  { stage:1, id:"printer-go-brr", render:()=>(
    <C bg="#111" font="mono" center>
      <div style={{fontSize:"60px",marginBottom:"16px"}}>🖨️</div>
      <div style={{display:"flex",flexDirection:"column",gap:"6px",maxWidth:"300px",width:"100%"}}>
        {[["2008","$700B bailout"],["2020","$4.5T stimulus"],["2023","$1.7T spending bill"],["2024","$35T+ national debt"]].map(([yr,amt])=>(
          <div key={yr} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1a1a1a"}}>
            <span style={{color:"#666",fontSize:"13px"}}>{yr}</span>
            <span style={{color:"#ff4444",fontSize:"13px",fontWeight:"bold"}}>{amt}</span>
          </div>
        ))}
      </div>
      <Punch>They print. You pay.</Punch>
    </C>
  )},
  { stage:1, id:"what-things-cost", render:()=>(
    <C bg="#0d0d0d" font="mono">
      <Top>What $1 bought</Top>
      <Mid gap="16px">
        {[["1950","10 loaves of bread 🍞","#d4af37"],["1980","3 loaves of bread 🍞","#aa8822"],["2000","1 loaf of bread 🍞","#886611"],["2025","½ a loaf 🍞","#555"]].map(([yr,item,c])=>(
          <div key={yr} style={{display:"flex",gap:"16px",alignItems:"baseline"}}>
            <span style={{color:"#666",fontSize:"11px",letterSpacing:"2px",minWidth:"40px"}}>{yr}</span>
            <span style={{color:c,fontSize:"15px",fontFamily:"'Georgia',serif"}}>{item}</span>
          </div>
        ))}
      </Mid>
      <Punch>Same dollar. Less bread. Every decade.</Punch>
    </C>
  )},
  { stage:1, id:"algorithm-you", render:()=>(
    <C bg="#0a0a0a" font="serif" center>
      <div style={{fontSize:"72px",marginBottom:"16px"}}>🧠</div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px",maxWidth:"300px"}}>
        <div style={{color:"#888",fontSize:"14px"}}>The algorithm knows:</div>
        {["What makes you angry","What makes you insecure","What keeps you scrolling","How to sell you things you don't need"].map((t,i)=>(
          <div key={t} style={{color:i===3?"#ff4444":"#666",fontSize:"14px",padding:"4px 0",borderBottom:"1px solid #1a1a1a"}}>{t}</div>
        ))}
      </div>
      <Punch>You are the product.<br/>Your attention is the price.</Punch>
    </C>
  )},
  { stage:1, id:"work-hours-house", render:()=>(
    <C bg="#111" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"24px"}}>Hours of work to buy a house</div>
      <div style={{display:"flex",gap:"32px",justifyContent:"center",alignItems:"flex-end"}}>
        <div style={{textAlign:"center"}}>
          <div style={{width:"60px",height:"80px",background:"#d4af37",borderRadius:"4px 4px 0 0"}}/>
          <div style={{color:"#d4af37",fontSize:"13px",fontWeight:"bold",marginTop:"8px"}}>1970</div>
          <div style={{color:"#888",fontSize:"11px"}}>4,300 hrs</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{width:"60px",height:"220px",background:"#ff4444",borderRadius:"4px 4px 0 0"}}/>
          <div style={{color:"#ff4444",fontSize:"13px",fontWeight:"bold",marginTop:"8px"}}>2025</div>
          <div style={{color:"#888",fontSize:"11px"}}>14,000 hrs</div>
        </div>
      </div>
      <Punch>You're not lazier than your grandparents.<br/>The game changed.</Punch>
    </C>
  )},
  { stage:1, id:"ceo-vs-worker", render:()=>(
    <C bg="#0a0a0a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"20px"}}>CEO-to-worker pay ratio</div>
      <div style={{display:"flex",gap:"40px",alignItems:"flex-end",justifyContent:"center"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"32px",marginBottom:"8px"}}>👷</div>
          <div style={{width:"40px",height:"16px",background:"#444",borderRadius:"2px",margin:"0 auto"}}/>
          <div style={{color:"#888",fontSize:"11px",marginTop:"8px"}}>1965: 20x</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"32px",marginBottom:"8px"}}>👔</div>
          <div style={{width:"40px",height:"200px",background:"#ff4444",borderRadius:"2px",margin:"0 auto"}}/>
          <div style={{color:"#ff4444",fontSize:"11px",marginTop:"8px"}}>2025: 350x</div>
        </div>
      </div>
      <Punch>Same 1,440 minutes in a day.</Punch>
    </C>
  )},
  { stage:1, id:"savings-melting", render:()=>(
    <C bg="#0d0d0d" font="serif" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",fontFamily:"'Courier New',monospace",marginBottom:"20px"}}>Your savings account</div>
      <div style={{fontSize:"60px",marginBottom:"12px"}}>🧊</div>
      <div style={{color:"#fff",fontSize:"28px",fontWeight:"bold"}}>2% interest</div>
      <div style={{color:"#ff4444",fontSize:"28px",fontWeight:"bold",marginTop:"4px"}}>7% inflation</div>
      <div style={{width:"60px",height:"1px",background:"#222",margin:"20px 0"}}/>
      <div style={{color:"#ff4444",fontSize:"16px",fontStyle:"italic"}}>Your money melts 5% a year<br/>while it sits in the bank.</div>
    </C>
  )},
  { stage:1, id:"deep-fake-trust", render:()=>(
    <C bg="#0a0a0a" font="mono" center>
      <div style={{fontSize:"60px",marginBottom:"16px"}}>🎭</div>
      <div style={{color:"#fff",fontSize:"22px",fontFamily:"'Georgia',serif",fontWeight:"bold",marginBottom:"16px"}}>2015: "Seeing is believing"</div>
      <div style={{color:"#555",fontSize:"22px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>2025: Seeing is nothing</div>
      <Punch>When anyone can fake anything,<br/>trust becomes the scarcest resource.</Punch>
    </C>
  )},
  { stage:1, id:"attention-economy", render:()=>(
    <C bg="#111" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"20px"}}>You have two economies</div>
      <div style={{display:"flex",gap:"20px",justifyContent:"center"}}>
        <div style={{padding:"20px",background:"rgba(255,255,255,0.03)",borderRadius:"12px",border:"1px solid #1a1a1a",textAlign:"center",flex:1,maxWidth:"150px"}}>
          <div style={{fontSize:"36px",marginBottom:"8px"}}>💰</div>
          <div style={{color:"#888",fontSize:"13px"}}>The one you<br/>see</div>
          <div style={{color:"#555",fontSize:"11px",marginTop:"8px"}}>Dollars in, dollars out</div>
        </div>
        <div style={{padding:"20px",background:"rgba(255,68,68,0.05)",borderRadius:"12px",border:"1px solid #331111",textAlign:"center",flex:1,maxWidth:"150px"}}>
          <div style={{fontSize:"36px",marginBottom:"8px"}}>👁️</div>
          <div style={{color:"#ff4444",fontSize:"13px"}}>The one you<br/>don't</div>
          <div style={{color:"#555",fontSize:"11px",marginTop:"8px"}}>Your attention, sold</div>
        </div>
      </div>
      <Punch>You're being charged in a currency<br/>you didn't know you had.</Punch>
    </C>
  )},
  { stage:1, id:"productivity-wages", render:()=>(
    <C bg="#0d0d0d" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"24px"}}>Since 1979</div>
      <div style={{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"300px",width:"100%"}}>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{color:"#888",fontSize:"12px"}}>Productivity</span><span style={{color:"#44ff88",fontSize:"12px",fontWeight:"bold"}}>+80%</span></div>
          <div style={{height:"16px",background:"#1a1a1a",borderRadius:"4px",overflow:"hidden"}}><div style={{width:"80%",height:"100%",background:"#44ff88",borderRadius:"4px"}}/></div>
        </div>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{color:"#888",fontSize:"12px"}}>Wages</span><span style={{color:"#ff4444",fontSize:"12px",fontWeight:"bold"}}>+12%</span></div>
          <div style={{height:"16px",background:"#1a1a1a",borderRadius:"4px",overflow:"hidden"}}><div style={{width:"12%",height:"100%",background:"#ff4444",borderRadius:"4px"}}/></div>
        </div>
      </div>
      <Punch>You produce more. You earn the same.<br/>Where does the rest go?</Punch>
    </C>
  )},
  { stage:1, id:"rent-check", render:()=>(
    <C bg="#111" font="serif" center>
      <div style={{fontSize:"72px",marginBottom:"16px"}}>🏠</div>
      <div style={{color:"#888",fontSize:"14px",fontFamily:"'Courier New',monospace",marginBottom:"8px"}}>MONTHLY INCOME: $4,200</div>
      <div style={{display:"flex",flexDirection:"column",gap:"4px",maxWidth:"280px",width:"100%"}}>
        {[["Rent","$1,800","43%"],["Food","$600","14%"],["Insurance","$500","12%"],["Transport","$400","10%"],["Student loans","$350","8%"],["Phone + internet","$150","4%"],["Remaining","$400","10%"]].map(([n,a,p])=>(
          <div key={n} style={{display:"flex",justifyContent:"space-between",fontSize:"12px",padding:"3px 0",borderBottom:"1px solid #1a1a1a"}}>
            <span style={{color:"#888"}}>{n}</span><span style={{color:n==="Remaining"?"#44ff88":"#555"}}>{a}</span>
          </div>
        ))}
      </div>
      <Punch>$400 left to build a life.<br/>That's not an economy. That's a treadmill.</Punch>
    </C>
  )},
  { stage:1, id:"billionaire-clock", render:()=>(
    <C bg="#0a0a0a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"24px"}}>Time to earn $1,000,000</div>
      <div style={{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"300px",width:"100%"}}>
        {[["Median worker","20 years","#555"],["Doctor","4 years","#888"],["Tech CEO","3 days","#f7931a"],["Top hedge fund","11 minutes","#ff4444"]].map(([w,t,c])=>(
          <div key={w} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1a1a1a"}}>
            <span style={{color:"#888",fontSize:"13px",fontFamily:"'Georgia',serif"}}>{w}</span>
            <span style={{color:c,fontSize:"13px",fontWeight:"bold"}}>{t}</span>
          </div>
        ))}
      </div>
      <Punch>Same 1,440 minutes.<br/>Different measuring stick.</Punch>
    </C>
  )},
  { stage:1, id:"fast-fashion", render:()=>(
    <C bg="#111" font="serif" center>
      <div style={{display:"flex",gap:"32px",justifyContent:"center",marginBottom:"16px"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"48px"}}>👗</div>
          <div style={{color:"#888",fontSize:"12px",marginTop:"4px"}}>Worn 7 times</div>
          <div style={{color:"#555",fontSize:"11px"}}>Landfill</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"48px"}}>🧥</div>
          <div style={{color:"#d4af37",fontSize:"12px",marginTop:"4px"}}>Worn 700 times</div>
          <div style={{color:"#888",fontSize:"11px"}}>Still going</div>
        </div>
      </div>
      <div style={{color:"#888",fontSize:"13px",marginBottom:"8px"}}>The economy rewards the first one more.</div>
      <Punch>Disposability is profitable.<br/>Durability should be.</Punch>
    </C>
  )},

  // ───────────────────────────────────────
  // STAGE 2: CRYPTO CURIOUS (18 memes)
  // ───────────────────────────────────────
  { stage:2, id:"drake-btc", render:()=>(
    <C bg="#1a1a2e" font="mono">
      <div style={{position:"absolute",inset:0,opacity:0.06,background:"radial-gradient(circle at 30% 40%,#f7931a,transparent 60%)"}}/>
      <Top>Bitcoin in practice</Top>
      <Mid gap="20px">
        <div style={{display:"flex",alignItems:"center",gap:"16px",padding:"16px 20px",background:"rgba(255,255,255,0.03)",borderRadius:"12px",border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{width:"48px",height:"48px",borderRadius:"50%",background:"#2a1a1a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",flexShrink:0}}>🙅</div>
          <div><div style={{color:"#ff6b6b",fontSize:"16px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>Spending Bitcoin</div><div style={{color:"#555",fontSize:"11px",marginTop:"4px"}}>"That could be worth $47K someday"</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"16px",padding:"16px 20px",background:"rgba(247,147,26,0.08)",borderRadius:"12px",border:"1px solid rgba(247,147,26,0.2)"}}>
          <div style={{width:"48px",height:"48px",borderRadius:"50%",background:"#2a2a1a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",flexShrink:0}}>😌</div>
          <div><div style={{color:"#f7931a",fontSize:"16px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>Hoarding Bitcoin forever</div><div style={{color:"#888",fontSize:"11px",marginTop:"4px"}}>"Checking the price 47 times a day"</div></div>
        </div>
      </Mid>
      <Punch>A currency nobody spends isn't a currency.</Punch>
    </C>
  )},
  { stage:2, id:"pizza-guy", render:()=>(
    <C bg="#0d0d0d" font="mono" center>
      <div style={{fontSize:"80px",marginBottom:"20px"}}>😰</div>
      <div style={{background:"rgba(255,255,255,0.04)",borderRadius:"16px",padding:"20px 24px",border:"1px solid rgba(255,255,255,0.06)",maxWidth:"300px"}}>
        <div style={{color:"#ccc",fontSize:"15px",fontFamily:"'Georgia',serif",lineHeight:1.7,fontStyle:"italic",textAlign:"center"}}>"Should I buy this coffee?<br/><br/>Or will this be a $47,000 latte?"</div>
      </div>
      <div style={{marginTop:"24px",display:"flex",gap:"12px"}}>
        <div style={{padding:"8px 20px",background:"#f7931a",borderRadius:"20px",color:"#000",fontSize:"12px",fontWeight:"bold",opacity:0.25}}>Buy ☕</div>
        <div style={{padding:"8px 20px",background:"rgba(255,255,255,0.1)",borderRadius:"20px",color:"#fff",fontSize:"12px",fontWeight:"bold"}}>HODL 💎</div>
      </div>
      <Punch>When spending feels like losing,<br/>it's not a currency. It's a trap.</Punch>
    </C>
  )},
  { stage:2, id:"btc-pyramid", render:()=>(
    <C bg="#0f0f0f" font="mono">
      <Top>First-mover advantage</Top>
      <Mid center gap="6px">
        <div style={{width:"70px",padding:"12px 0",background:"#f7931a",borderRadius:"4px 4px 0 0",textAlign:"center",fontSize:"11px",color:"#000",fontWeight:"bold"}}>2009</div>
        <div style={{width:"150px",padding:"12px 0",background:"#c46a00",textAlign:"center",fontSize:"11px",color:"#fff"}}>2013</div>
        <div style={{width:"240px",padding:"12px 0",background:"#7a4200",textAlign:"center",fontSize:"11px",color:"#ddd"}}>2017</div>
        <div style={{width:"320px",padding:"12px 0",background:"#3d2100",textAlign:"center",fontSize:"11px",color:"#999",border:"1px dashed #555"}}>2025 — YOU ARE HERE</div>
      </Mid>
      <Punch>A revolution where early adopters own everything<br/>isn't a revolution. It's a rerun.</Punch>
    </C>
  )},
  { stage:2, id:"btc-vs-reality", render:()=>(
    <C bg="#111" font="mono">
      <Top>The white paper vs. reality</Top>
      <Mid gap="16px">
        {[['"Peer-to-peer cash"',"Nobody spends it","💸"],['"Anyone can participate"',"$10M+ mining rigs","⛏️"],['"A new financial system"',"Priced in dollars","💵"]].map(([p,r,e],i)=>(
          <div key={i} style={{display:"flex",gap:"14px",alignItems:"center"}}>
            <div style={{fontSize:"28px",flexShrink:0}}>{e}</div>
            <div><div style={{color:"#f7931a",fontSize:"14px",fontFamily:"'Georgia',serif"}}>{p}</div><div style={{color:"#555",fontSize:"12px",marginTop:"2px"}}>{r}</div></div>
          </div>
        ))}
      </Mid>
      <Punch>Bitcoin proved it's possible.<br/>It just didn't finish the job.</Punch>
    </C>
  )},
  // NEW S2
  { stage:2, id:"90pct-scams", render:()=>(
    <C bg="#0d0d0d" font="mono" center>
      <div style={{fontSize:"80px",color:"#f7931a",fontFamily:"'Georgia',serif",fontWeight:"bold",lineHeight:1}}>90%</div>
      <div style={{fontSize:"16px",color:"#888",marginTop:"8px",fontFamily:"'Georgia',serif"}}>of crypto is scams</div>
      <div style={{width:"60px",height:"1px",background:"#222",margin:"24px 0"}}/>
      <div style={{fontSize:"16px",color:"#fff",fontFamily:"'Georgia',serif"}}>The other 10% is the most important<br/>technology since the internet.</div>
      <Punch>The hard part is telling which is which.</Punch>
    </C>
  )},
  { stage:2, id:"btc-exits", render:()=>(
    <C bg="#111" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"20px"}}>The Bitcoin lifecycle</div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px",maxWidth:"300px",width:"100%"}}>
        {["Buy Bitcoin with dollars","Hope number goes up","Number goes up","Sell Bitcoin for... dollars","Celebrate in... dollars"].map((s,i)=>(
          <div key={i} style={{display:"flex",gap:"12px",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #1a1a1a"}}>
            <div style={{color:i===4?"#ff4444":"#f7931a",fontSize:"13px",fontWeight:"bold",minWidth:"20px"}}>{i+1}.</div>
            <div style={{color:i===4?"#ff4444":"#888",fontSize:"13px",fontFamily:"'Georgia',serif"}}>{s}</div>
          </div>
        ))}
      </div>
      <Punch>The escape hatch leads back to the burning building.</Punch>
    </C>
  )},
  { stage:2, id:"btc-energy", render:()=>(
    <C bg="#0a0a0a" font="mono" center>
      <div style={{fontSize:"60px",marginBottom:"12px"}}>⚡</div>
      <div style={{color:"#f7931a",fontSize:"24px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>Bitcoin mining</div>
      <div style={{color:"#888",fontSize:"14px",marginTop:"8px"}}>uses more electricity than</div>
      <div style={{color:"#fff",fontSize:"20px",fontFamily:"'Georgia',serif",fontWeight:"bold",marginTop:"8px"}}>entire countries</div>
      <div style={{color:"#555",fontSize:"12px",marginTop:"4px"}}>...to solve puzzles that produce nothing</div>
      <Punch>What if mining meant verifying humans<br/>instead of burning energy?</Punch>
    </C>
  )},
  { stage:2, id:"hodl-culture", render:()=>(
    <C bg="#111" font="serif" center>
      <div style={{fontSize:"48px",marginBottom:"16px"}}>💎🙌</div>
      <div style={{color:"#f7931a",fontSize:"22px",fontWeight:"bold",marginBottom:"8px"}}>HODL culture</div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px",maxWidth:"280px"}}>
        <div style={{color:"#888",fontSize:"13px"}}>"Never sell"</div>
        <div style={{color:"#888",fontSize:"13px"}}>"Diamond hands"</div>
        <div style={{color:"#888",fontSize:"13px"}}>"Weak hands get shaken out"</div>
      </div>
      <div style={{width:"60px",height:"1px",background:"#222",margin:"20px 0"}}/>
      <div style={{color:"#555",fontSize:"13px",lineHeight:1.6}}>Translation: the system only works<br/>if nobody uses it as money.</div>
      <Punch>That's not a feature. That's a bug.</Punch>
    </C>
  )},
  { stage:2, id:"crypto-bro", render:()=>(
    <C bg="#0d0d0d" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"20px"}}>Crypto adoption problem</div>
      <div style={{fontSize:"48px",marginBottom:"16px"}}>🤝</div>
      <div style={{color:"#888",fontSize:"15px",fontFamily:"'Georgia',serif",lineHeight:1.7,maxWidth:"280px"}}>
        "You should buy Bitcoin"<br/><br/>
        <span style={{color:"#555"}}>"What does it do?"</span><br/><br/>
        "It goes up"<br/><br/>
        <span style={{color:"#555"}}>"What can I buy with it?"</span><br/><br/>
        <span style={{color:"#f7931a"}}>"...more Bitcoin"</span>
      </div>
    </C>
  )},
  { stage:2, id:"wallet-ux", render:()=>(
    <C bg="#111" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"20px"}}>Crypto onboarding</div>
      <div style={{display:"flex",flexDirection:"column",gap:"6px",maxWidth:"300px",width:"100%"}}>
        {["Download wallet","Write down 24 seed words","Don't lose the paper","Buy ETH for gas fees","Approve the contract","Pay the gas fee","Transaction failed","Pay another gas fee","Wait 47 minutes","Done! (maybe)"].map((s,i)=>(
          <div key={i} style={{display:"flex",gap:"8px",alignItems:"center"}}>
            <span style={{color:i===9?"#44ff88":"#555",fontSize:"11px",minWidth:"16px"}}>{i+1}.</span>
            <span style={{color:i>=6?"#ff4444":"#888",fontSize:"12px"}}>{s}</span>
          </div>
        ))}
      </div>
      <Punch>If your mom can't use it,<br/>it's not ready.</Punch>
    </C>
  )},
  { stage:2, id:"satoshi-vision", render:()=>(
    <C bg="#0a0a0a" font="serif" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",fontFamily:"'Courier New',monospace",marginBottom:"24px"}}>Satoshi's white paper, line 1</div>
      <div style={{color:"#f7931a",fontSize:"18px",fontStyle:"italic",lineHeight:1.6,maxWidth:"300px"}}>"A purely peer-to-peer version of electronic cash would allow online payments..."</div>
      <div style={{width:"60px",height:"1px",background:"#222",margin:"24px 0"}}/>
      <div style={{color:"#555",fontSize:"14px"}}>Today's Bitcoin reality:</div>
      <div style={{color:"#fff",fontSize:"18px",fontWeight:"bold",marginTop:"8px"}}>A speculative asset you buy on Coinbase and never spend.</div>
    </C>
  )},
  { stage:2, id:"stablecoin-trap", render:()=>(
    <C bg="#111" font="mono" center>
      <div style={{fontSize:"48px",marginBottom:"16px"}}>🪤</div>
      <div style={{color:"#f7931a",fontSize:"20px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>"Stablecoins fix this"</div>
      <div style={{width:"60px",height:"1px",background:"#222",margin:"20px 0"}}/>
      <div style={{color:"#888",fontSize:"14px",lineHeight:1.7,maxWidth:"280px"}}>
        Pegged to the dollar.<br/>
        The dollar inflates.<br/>
        So the stablecoin inflates.
      </div>
      <Punch>Electronic fiat is still fiat.</Punch>
    </C>
  )},
  { stage:2, id:"gas-fees", render:()=>(
    <C bg="#0d0d0d" font="mono" center>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>⛽</div>
      <div style={{color:"#888",fontSize:"14px",marginBottom:"12px"}}>You want to send $20 to a friend</div>
      <div style={{display:"flex",gap:"8px",justifyContent:"center",alignItems:"baseline"}}>
        <span style={{color:"#fff",fontSize:"20px",fontFamily:"'Georgia',serif"}}>$20</span>
        <span style={{color:"#555"}}>+</span>
        <span style={{color:"#ff4444",fontSize:"20px",fontFamily:"'Georgia',serif"}}>$4.73 gas fee</span>
      </div>
      <div style={{color:"#555",fontSize:"12px",marginTop:"8px"}}>Congested? That'll be $47.</div>
      <Punch>A 24% tax just to move your own money.</Punch>
    </C>
  )},
  { stage:2, id:"btc-pizza-math", render:()=>(
    <C bg="#111" font="mono" center>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>🍕</div>
      <div style={{color:"#f7931a",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"16px"}}>May 22, 2010</div>
      <div style={{color:"#888",fontSize:"15px",fontFamily:"'Georgia',serif",lineHeight:1.8}}>
        10,000 BTC → 2 pizzas<br/>
        <span style={{color:"#555"}}>Today those coins =</span><br/>
        <span style={{color:"#ff4444",fontSize:"24px",fontWeight:"bold"}}>$1,000,000,000</span>
      </div>
      <Punch>The lesson everyone learned:<br/>never spend Bitcoin. Ever.</Punch>
    </C>
  )},
  { stage:2, id:"whales", render:()=>(
    <C bg="#0a0a0a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"20px"}}>Who owns Bitcoin</div>
      <div style={{fontSize:"60px",marginBottom:"8px"}}>🐋</div>
      <div style={{color:"#f7931a",fontSize:"28px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>2%</div>
      <div style={{color:"#888",fontSize:"14px",marginTop:"4px"}}>of addresses hold</div>
      <div style={{color:"#fff",fontSize:"28px",fontFamily:"'Georgia',serif",fontWeight:"bold",marginTop:"4px"}}>95%</div>
      <div style={{color:"#888",fontSize:"14px",marginTop:"4px"}}>of all Bitcoin</div>
      <Punch>Decentralized technology.<br/>Centralized wealth.</Punch>
    </C>
  )},
  { stage:2, id:"blockchain-good", render:()=>(
    <C bg="#111" font="serif" center>
      <div style={{display:"flex",gap:"20px",justifyContent:"center",marginBottom:"16px"}}>
        <div style={{textAlign:"center",padding:"16px 20px",background:"rgba(68,255,136,0.05)",borderRadius:"12px",border:"1px solid #1a3a1a",flex:1,maxWidth:"140px"}}>
          <div style={{fontSize:"36px",marginBottom:"8px"}}>⛓️</div>
          <div style={{color:"#44ff88",fontSize:"14px",fontWeight:"bold"}}>Blockchain</div>
          <div style={{color:"#556b55",fontSize:"11px",marginTop:"4px"}}>The technology</div>
        </div>
        <div style={{textAlign:"center",padding:"16px 20px",background:"rgba(255,68,68,0.05)",borderRadius:"12px",border:"1px solid #331111",flex:1,maxWidth:"140px"}}>
          <div style={{fontSize:"36px",marginBottom:"8px"}}>🎰</div>
          <div style={{color:"#ff4444",fontSize:"14px",fontWeight:"bold"}}>Crypto culture</div>
          <div style={{color:"#553333",fontSize:"11px",marginTop:"4px"}}>The casino</div>
        </div>
      </div>
      <Punch>Don't confuse the engine<br/>with the car it's in.</Punch>
    </C>
  )},
  { stage:2, id:"money-printer-btc", render:()=>(
    <C bg="#0a0a0a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#555",textTransform:"uppercase",marginBottom:"20px"}}>Two broken systems</div>
      <div style={{display:"flex",gap:"8px",justifyContent:"center",alignItems:"center"}}>
        <div style={{padding:"16px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",textAlign:"center",width:"140px"}}>
          <div style={{fontSize:"32px"}}>🏛️</div>
          <div style={{color:"#888",fontSize:"12px",marginTop:"4px"}}>Prints unlimited money</div>
        </div>
        <div style={{color:"#555",fontSize:"20px"}}>vs</div>
        <div style={{padding:"16px",background:"rgba(247,147,26,0.05)",borderRadius:"8px",textAlign:"center",width:"140px"}}>
          <div style={{fontSize:"32px"}}>₿</div>
          <div style={{color:"#888",fontSize:"12px",marginTop:"4px"}}>Nobody spends it</div>
        </div>
      </div>
      <Punch>One is too loose. One is too tight.<br/>Neither is money.</Punch>
    </C>
  )},

  // ───────────────────────────────────────
  // STAGE 3: FIRST STEP (24 memes)
  // ───────────────────────────────────────
  { stage:3, id:"1440-equal", render:()=>(
    <C bg="#080f08" font="mono" center>
      <div style={{position:"absolute",inset:0,opacity:0.06,background:"radial-gradient(circle at 50% 50%,#44ff8830,transparent 60%)"}}/>
      <div style={{fontSize:"80px",color:"#44ff88",fontFamily:"'Georgia',serif",fontWeight:"bold",lineHeight:1}}>1,440</div>
      <div style={{fontSize:"16px",color:"#44ff88",marginTop:"8px",fontFamily:"'Georgia',serif",opacity:0.7}}>minutes per day</div>
      <div style={{marginTop:"28px",display:"flex",flexDirection:"column",gap:"6px",width:"100%",maxWidth:"300px"}}>
        {[["Jeff Bezos","1,440"],["A teacher in Ohio","1,440"],["A farmer in Kenya","1,440"],["You","1,440"]].map(([n,m])=>(
          <div key={n} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #0f1f0f"}}>
            <span style={{color:"#888",fontSize:"13px",fontFamily:"'Georgia',serif"}}>{n}</span>
            <span style={{color:"#44ff88",fontSize:"13px",fontWeight:"bold"}}>{m}</span>
          </div>
        ))}
      </div>
      <Punch g>What if the economy started here?</Punch>
    </C>
  )},
  { stage:3, id:"use-or-lose", render:()=>(
    <C bg="#0a0f0a" font="mono" center>
      <div style={{display:"flex",alignItems:"center",gap:"16px"}}><div style={{fontSize:"44px"}}>🌅</div><div style={{color:"#44ff88",fontSize:"24px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>+1,440 points</div></div>
      <div style={{color:"#2a3a2a",fontSize:"14px",margin:"20px 0"}}>↓ spend however you want ↓</div>
      <div style={{display:"flex",alignItems:"center",gap:"16px"}}><div style={{fontSize:"44px"}}>🌙</div><div style={{color:"#ff4444",fontSize:"24px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>Unspent = gone</div></div>
      <Punch>Money should be spent, not worshipped.</Punch>
    </C>
  )},
  { stage:3, id:"build-to-last", render:()=>(
    <C bg="#0d0d08" font="serif">
      <Mid gap="24px">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}><span style={{fontSize:"32px"}}>🪑</span><span style={{color:"#666",fontSize:"15px"}}>Breaks in 2 years</span></div>
          <div style={{height:"28px",background:"#1a1a1a",borderRadius:"4px",overflow:"hidden"}}><div style={{width:"10%",height:"100%",background:"#664400",borderRadius:"4px"}}/></div>
        </div>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}><span style={{fontSize:"32px"}}>💺</span><span style={{color:"#d4af37",fontSize:"15px"}}>Lasts 20 years</span></div>
          <div style={{height:"28px",background:"#1a1a1a",borderRadius:"4px",overflow:"hidden"}}><div style={{width:"100%",height:"100%",background:"linear-gradient(90deg,#d4af37,#f5d76e)",borderRadius:"4px"}}/></div>
        </div>
      </Mid>
      <Punch>Planned obsolescence just became<br/>economically irrational.</Punch>
    </C>
  )},
  { stage:3, id:"parks", render:()=>(
    <C bg="#0a120a" font="mono">
      <Mid gap="16px">
        <div style={{textAlign:"center",fontSize:"13px",color:"#666",fontFamily:"'Georgia',serif"}}>Same city. Same budget. Two parks.</div>
        <div style={{padding:"20px",background:"rgba(68,255,136,0.05)",borderRadius:"12px",border:"1px solid #1a3a1a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:"18px",color:"#44ff88",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>🌳 Well maintained</div><div style={{fontSize:"11px",color:"#556b55",marginTop:"4px"}}>People stay for hours</div></div>
          <div style={{fontSize:"28px",color:"#44ff88",fontWeight:"bold",fontFamily:"'Georgia',serif"}}>847<span style={{fontSize:"11px",color:"#2a6b3a"}}> pts</span></div>
        </div>
        <div style={{padding:"20px",background:"rgba(255,255,255,0.02)",borderRadius:"12px",border:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:"18px",color:"#555",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>🏚️ Neglected</div><div style={{fontSize:"11px",color:"#444",marginTop:"4px"}}>People walk through</div></div>
          <div style={{fontSize:"28px",color:"#444",fontWeight:"bold",fontFamily:"'Georgia',serif"}}>31<span style={{fontSize:"11px",color:"#333"}}> pts</span></div>
        </div>
      </Mid>
      <Punch>Spaces earn by being worth spending time in.</Punch>
    </C>
  )},
  // NEW S3
  { stage:3, id:"stay-at-home", render:()=>(
    <C bg="#080f08" font="serif" center>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>👩‍👧‍👦</div>
      <div style={{color:"#888",fontSize:"14px",fontFamily:"'Courier New',monospace",marginBottom:"8px"}}>STAY-AT-HOME PARENT</div>
      <div style={{display:"flex",gap:"20px",justifyContent:"center"}}>
        <div style={{textAlign:"center",padding:"16px",background:"rgba(255,255,255,0.02)",borderRadius:"8px",border:"1px solid #1a1a1a",width:"120px"}}>
          <div style={{color:"#555",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"4px"}}>Old system</div>
          <div style={{color:"#555",fontSize:"28px",fontWeight:"bold"}}>$0</div>
        </div>
        <div style={{textAlign:"center",padding:"16px",background:"rgba(68,255,136,0.05)",borderRadius:"8px",border:"1px solid #1a3a1a",width:"120px"}}>
          <div style={{color:"#2a6b3a",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"4px"}}>AE</div>
          <div style={{color:"#44ff88",fontSize:"28px",fontWeight:"bold"}}>1,440</div>
          <div style={{color:"#2a6b3a",fontSize:"10px"}}>pts / day</div>
        </div>
      </div>
      <Punch g>Her work finally shows up in the economy.</Punch>
    </C>
  )},
  { stage:3, id:"no-first-mover", render:()=>(
    <C bg="#0a0f0a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",marginBottom:"24px"}}>Day 1 vs Day 1,000</div>
      <div style={{display:"flex",gap:"20px",justifyContent:"center"}}>
        <div style={{textAlign:"center"}}>
          <div style={{color:"#44ff88",fontSize:"36px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>1,440</div>
          <div style={{color:"#556b55",fontSize:"12px",marginTop:"4px"}}>Person who<br/>joined first</div>
        </div>
        <div style={{color:"#2a3a2a",fontSize:"24px",alignSelf:"center"}}>=</div>
        <div style={{textAlign:"center"}}>
          <div style={{color:"#44ff88",fontSize:"36px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>1,440</div>
          <div style={{color:"#556b55",fontSize:"12px",marginTop:"4px"}}>Person who<br/>joined today</div>
        </div>
      </div>
      <Punch g>No early bird advantage.<br/>Same points. Every morning. Forever.</Punch>
    </C>
  )},
  { stage:3, id:"deepfake-solved", render:()=>(
    <C bg="#080f08" font="mono" center>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>🎭 → ⛓️</div>
      <div style={{color:"#888",fontSize:"14px",fontFamily:"'Georgia',serif",marginBottom:"16px"}}>Every post. Every video. Every comment.</div>
      <div style={{color:"#44ff88",fontSize:"20px",fontFamily:"'Georgia',serif",fontWeight:"bold",lineHeight:1.6}}>Traceable to a verified human<br/>with something at stake.</div>
      <Punch g>Lies become expensive to tell.</Punch>
    </C>
  )},
  { stage:3, id:"proof-of-human", render:()=>(
    <C bg="#0a0f0a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",marginBottom:"20px"}}>Proof of work vs proof of human</div>
      <div style={{display:"flex",gap:"16px",justifyContent:"center"}}>
        <div style={{textAlign:"center",padding:"16px",background:"rgba(247,147,26,0.05)",borderRadius:"10px",border:"1px solid #332a1a",flex:1,maxWidth:"140px"}}>
          <div style={{fontSize:"32px",marginBottom:"8px"}}>⛏️</div>
          <div style={{color:"#f7931a",fontSize:"13px",fontWeight:"bold"}}>Bitcoin</div>
          <div style={{color:"#555",fontSize:"11px",marginTop:"4px"}}>Burns electricity<br/>to solve puzzles</div>
        </div>
        <div style={{textAlign:"center",padding:"16px",background:"rgba(68,255,136,0.05)",borderRadius:"10px",border:"1px solid #1a3a1a",flex:1,maxWidth:"140px"}}>
          <div style={{fontSize:"32px",marginBottom:"8px"}}>🧬</div>
          <div style={{color:"#44ff88",fontSize:"13px",fontWeight:"bold"}}>AE</div>
          <div style={{color:"#556b55",fontSize:"11px",marginTop:"4px"}}>Verifies humans<br/>to prevent fraud</div>
        </div>
      </div>
      <Punch g>Mining should protect people,<br/>not waste energy.</Punch>
    </C>
  )},
  { stage:3, id:"spouse-points", render:()=>(
    <C bg="#080f08" font="serif" center>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>💑</div>
      <div style={{color:"#888",fontSize:"14px",fontFamily:"'Courier New',monospace",marginBottom:"16px"}}>ONE PARTNER WORKS. ONE STAYS HOME.</div>
      <div style={{color:"#44ff88",fontSize:"16px",lineHeight:1.8}}>
        Working partner sends 1,440 pts →<br/>
        Stay-at-home partner
      </div>
      <div style={{width:"60px",height:"1px",background:"#1a2a1a",margin:"16px 0"}}/>
      <div style={{color:"#fff",fontSize:"15px",fontStyle:"italic"}}>Caregiving becomes a visible<br/>economic contribution.</div>
    </C>
  )},
  { stage:3, id:"city-earns", render:()=>(
    <C bg="#0a120a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",marginBottom:"20px"}}>How cities get funded</div>
      <div style={{display:"flex",gap:"16px",justifyContent:"center"}}>
        <div style={{textAlign:"center",padding:"16px",background:"rgba(255,255,255,0.02)",borderRadius:"8px",border:"1px solid #1a1a1a",flex:1,maxWidth:"140px"}}>
          <div style={{color:"#888",fontSize:"13px",fontWeight:"bold"}}>Old way</div>
          <div style={{color:"#555",fontSize:"11px",marginTop:"8px"}}>Tax your income.<br/>Spend it however.</div>
        </div>
        <div style={{textAlign:"center",padding:"16px",background:"rgba(68,255,136,0.05)",borderRadius:"8px",border:"1px solid #1a3a1a",flex:1,maxWidth:"140px"}}>
          <div style={{color:"#44ff88",fontSize:"13px",fontWeight:"bold"}}>AE</div>
          <div style={{color:"#556b55",fontSize:"11px",marginTop:"8px"}}>People show up.<br/>City earns points.</div>
        </div>
      </div>
      <Punch g>Presence replaces taxation.</Punch>
    </C>
  )},
  { stage:3, id:"shoes-earn", render:()=>(
    <C bg="#0d0d08" font="serif" center>
      <div style={{fontSize:"48px",marginBottom:"8px"}}>👟</div>
      <div style={{color:"#d4af37",fontSize:"18px",fontWeight:"bold"}}>Your shoes are earning right now.</div>
      <div style={{width:"60px",height:"1px",background:"#222",margin:"16px 0"}}/>
      <div style={{color:"#888",fontSize:"13px",lineHeight:1.7,maxWidth:"280px"}}>Every minute you wear them,<br/>the manufacturer earns points.</div>
      <Punch>Build things that last.<br/>Get paid for as long as they do.</Punch>
    </C>
  )},
  { stage:3, id:"not-communism", render:()=>(
    <C bg="#080f08" font="mono" center>
      <div style={{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"300px"}}>
        <div style={{color:"#ff4444",fontSize:"14px"}}>"Isn't this just communism?"</div>
        <div style={{width:"40px",height:"1px",background:"#1a2a1a"}}/>
        <div style={{color:"#888",fontSize:"13px",fontFamily:"'Georgia',serif",lineHeight:1.7}}>
          A doctor who saves lives earns more.<br/>
          A builder who makes quality earns more.<br/>
          Wealth differences persist.
        </div>
        <div style={{width:"40px",height:"1px",background:"#1a2a1a"}}/>
        <div style={{color:"#44ff88",fontSize:"14px",fontFamily:"'Georgia',serif"}}>The difference: everyone starts each day with a floor, not a ceiling.</div>
      </div>
    </C>
  )},
  { stage:3, id:"no-central-bank", render:()=>(
    <C bg="#0a0f0a" font="mono" center>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>🚫🏛️</div>
      <div style={{color:"#44ff88",fontSize:"20px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>No central bank</div>
      <div style={{color:"#556b55",fontSize:"14px",marginTop:"4px"}}>can print more points</div>
      <div style={{width:"60px",height:"1px",background:"#1a2a1a",margin:"20px 0"}}/>
      <div style={{color:"#44ff88",fontSize:"20px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>0.5% transaction fee</div>
      <div style={{color:"#556b55",fontSize:"14px",marginTop:"4px"}}>hardcoded. immutable. forever.</div>
      <Punch g>Rules that nobody can change.<br/>Not even the people who wrote them.</Punch>
    </C>
  )},
  { stage:3, id:"bread-stable", render:()=>(
    <C bg="#080f08" font="serif" center>
      <div style={{fontSize:"48px",marginBottom:"8px"}}>🍞</div>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",fontFamily:"'Courier New',monospace",marginBottom:"16px"}}>Price of bread</div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px",maxWidth:"240px"}}>
        {[["Day 1","20 pts"],["Day 100","20 pts"],["Day 1,000","20 pts"],["Day 10,000","~20 pts"]].map(([d,p])=>(
          <div key={d} style={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #0f1f0f",paddingBottom:"4px"}}>
            <span style={{color:"#888",fontSize:"13px"}}>{d}</span>
            <span style={{color:"#44ff88",fontSize:"13px",fontWeight:"bold"}}>{p}</span>
          </div>
        ))}
      </div>
      <Punch g>Rebasing keeps prices stable.<br/>No inflation. No deflation. Just stable.</Punch>
    </C>
  )},
  { stage:3, id:"vouch-system", render:()=>(
    <C bg="#0a0f0a" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",marginBottom:"16px"}}>Don't trust institutions?</div>
      <div style={{fontSize:"48px",marginBottom:"8px"}}>🤝🤝🤝</div>
      <div style={{color:"#44ff88",fontSize:"18px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>10 people who know you're real</div>
      <div style={{color:"#556b55",fontSize:"13px",marginTop:"4px"}}>= full verification</div>
      <div style={{width:"60px",height:"1px",background:"#1a2a1a",margin:"16px 0"}}/>
      <div style={{color:"#888",fontSize:"13px",lineHeight:1.6}}>No government ID required.<br/>No biometrics required.<br/>Just people willing to stake on you.</div>
    </C>
  )},
  { stage:3, id:"three-flows", render:()=>(
    <C bg="#080f08" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",marginBottom:"20px"}}>Three flows. Every day.</div>
      <div style={{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"300px",width:"100%"}}>
        <div style={{padding:"12px 16px",background:"rgba(68,255,136,0.06)",borderRadius:"8px",border:"1px solid #1a3a1a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{color:"#44ff88",fontSize:"14px",fontWeight:"bold"}}>Active</div><div style={{color:"#556b55",fontSize:"11px"}}>Spend however you want</div></div>
          <div style={{color:"#44ff88",fontSize:"18px",fontWeight:"bold"}}>1,440</div>
        </div>
        <div style={{padding:"12px 16px",background:"rgba(212,175,55,0.06)",borderRadius:"8px",border:"1px solid #2a2a1a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{color:"#d4af37",fontSize:"14px",fontWeight:"bold"}}>Supportive</div><div style={{color:"#6b6b2a",fontSize:"11px"}}>Flows to things you use</div></div>
          <div style={{color:"#d4af37",fontSize:"18px",fontWeight:"bold"}}>144</div>
        </div>
        <div style={{padding:"12px 16px",background:"rgba(100,149,237,0.06)",borderRadius:"8px",border:"1px solid #1a1a3a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{color:"#6495ed",fontSize:"14px",fontWeight:"bold"}}>Ambient</div><div style={{color:"#2a2a6b",fontSize:"11px"}}>Flows to spaces you occupy</div></div>
          <div style={{color:"#6495ed",fontSize:"18px",fontWeight:"bold"}}>14.4</div>
        </div>
      </div>
    </C>
  )},
  { stage:3, id:"repair-rewarded", render:()=>(
    <C bg="#0d0d08" font="serif" center>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>🔧</div>
      <div style={{color:"#d4af37",fontSize:"20px",fontWeight:"bold"}}>You repair your jacket.</div>
      <div style={{color:"#888",fontSize:"14px",marginTop:"8px"}}>It keeps earning points.</div>
      <div style={{width:"60px",height:"1px",background:"#222",margin:"20px 0"}}/>
      <div style={{color:"#555",fontSize:"14px"}}>You throw it away and buy new.</div>
      <div style={{color:"#555",fontSize:"14px",marginTop:"4px"}}>The old one stops earning. Forever.</div>
      <Punch>Repair culture has an economic engine now.</Punch>
    </C>
  )},
  { stage:3, id:"join-anytime", render:()=>(
    <C bg="#080f08" font="mono" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",marginBottom:"20px"}}>Late to the party?</div>
      <div style={{fontSize:"60px",marginBottom:"8px"}}>🎉</div>
      <div style={{color:"#44ff88",fontSize:"22px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>Doesn't matter.</div>
      <div style={{color:"#888",fontSize:"14px",marginTop:"12px",lineHeight:1.7,maxWidth:"280px"}}>
        Tomorrow morning you get 1,440 points.<br/>
        Same as everyone else.<br/>
        Same as the founder.
      </div>
    </C>
  )},
  { stage:3, id:"garden-visible", render:()=>(
    <C bg="#0a120a" font="serif" center>
      <div style={{fontSize:"48px",marginBottom:"8px"}}>🌻</div>
      <div style={{color:"#888",fontSize:"14px",fontFamily:"'Courier New',monospace"}}>A COMMUNITY GARDEN</div>
      <div style={{display:"flex",gap:"20px",justifyContent:"center",margin:"16px 0"}}>
        <div style={{textAlign:"center"}}>
          <div style={{color:"#555",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px"}}>Old system</div>
          <div style={{color:"#555",fontSize:"24px",fontWeight:"bold",marginTop:"4px"}}>$0</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{color:"#2a6b3a",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px"}}>AE</div>
          <div style={{color:"#44ff88",fontSize:"24px",fontWeight:"bold",marginTop:"4px"}}>Earns daily</div>
          <div style={{color:"#2a6b3a",fontSize:"10px"}}>from every person who shows up</div>
        </div>
      </div>
      <Punch g>If people spend time there,<br/>the economy can finally see it.</Punch>
    </C>
  )},
  { stage:3, id:"infinite-game", render:()=>(
    <C bg="#080f08" font="serif" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",fontFamily:"'Courier New',monospace",marginBottom:"24px"}}>The game</div>
      <div style={{color:"#888",fontSize:"16px",lineHeight:2,maxWidth:"280px"}}>
        <span style={{color:"#ff4444"}}>Capture</span> lasted thousands of years.<br/>
        <span style={{color:"#f7931a"}}>Convince</span> lasted decades.<br/>
        <span style={{color:"#44ff88"}}>Coordinate</span> starts now.
      </div>
      <div style={{width:"60px",height:"1px",background:"#1a2a1a",margin:"24px 0"}}/>
      <div style={{color:"#fff",fontSize:"17px",fontWeight:"bold"}}>The game is infinite.</div>
    </C>
  )},
  { stage:3, id:"bridge", render:()=>(
    <C bg="#0a0f0a" font="serif" center>
      <div style={{fontSize:"11px",letterSpacing:"3px",color:"#2a6b3a",textTransform:"uppercase",fontFamily:"'Courier New',monospace",marginBottom:"20px"}}>Two sides. One bridge.</div>
      <div style={{display:"flex",gap:"12px",justifyContent:"center",alignItems:"center"}}>
        <div style={{textAlign:"center",padding:"14px",background:"rgba(247,147,26,0.05)",borderRadius:"8px",border:"1px solid #332a1a",width:"110px"}}>
          <div style={{color:"#f7931a",fontSize:"12px",fontWeight:"bold"}}>Crypto</div>
          <div style={{color:"#555",fontSize:"10px",marginTop:"4px"}}>Amazing tech.<br/>Can't get normal<br/>people to use it.</div>
        </div>
        <div style={{color:"#44ff88",fontSize:"24px"}}>⟷</div>
        <div style={{textAlign:"center",padding:"14px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",border:"1px solid #1a1a1a",width:"110px"}}>
          <div style={{color:"#888",fontSize:"12px",fontWeight:"bold"}}>Mainstream</div>
          <div style={{color:"#555",fontSize:"10px",marginTop:"4px"}}>Feels the system<br/>cracking. No<br/>alternative.</div>
        </div>
      </div>
      <Punch g>Someone has to build the bridge.</Punch>
    </C>
  )},
  { stage:3, id:"what-counts", render:()=>(
    <C bg="#080f08" font="serif" center>
      <div style={{color:"#44ff88",fontSize:"22px",fontWeight:"bold",lineHeight:1.6,maxWidth:"300px"}}>
        A system that does a better job of counting what counts.
      </div>
      <div style={{width:"60px",height:"1px",background:"#1a2a1a",margin:"24px 0"}}/>
      <div style={{color:"#556b55",fontSize:"13px"}}>The Alignment Economy</div>
    </C>
  )},
  { stage:3, id:"horse-to-car", render:()=>(
    <C bg="#0a0f0a" font="mono" center>
      <div style={{display:"flex",gap:"24px",justifyContent:"center",marginBottom:"20px"}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:"48px"}}>🐴</div><div style={{color:"#555",fontSize:"11px",marginTop:"4px"}}>Fiat</div></div>
        <div style={{color:"#2a3a2a",fontSize:"24px",alignSelf:"center"}}>→</div>
        <div style={{textAlign:"center"}}><div style={{fontSize:"48px"}}>🚗</div><div style={{color:"#44ff88",fontSize:"11px",marginTop:"4px"}}>AE</div></div>
      </div>
      <div style={{color:"#888",fontSize:"14px",fontFamily:"'Georgia',serif",lineHeight:1.7,maxWidth:"280px"}}>
        The automobile didn't replace the horse overnight. It took decades. Then there was no going back.
      </div>
      <Punch g>Not because anyone mandated it.<br/>Because a better system had arrived.</Punch>
    </C>
  )},
];

// ═══════════════════════════════════════════════════
// COMPONENT HELPERS (compact)
// ═══════════════════════════════════════════════════

/* eslint-disable @typescript-eslint/no-explicit-any */
function C({font,center,children}:any){
  return <div className="meme-card-content" style={{width:"100%",minHeight:"280px",background:"#ffffff",display:"flex",flexDirection:"column",fontFamily:font==="mono"?"'Courier New',monospace":"'Georgia',serif",position:"relative",overflow:"visible",...(center?{justifyContent:"center",alignItems:"center",padding:"32px 28px"}:{})}}>{children}</div>;
}
function Top({children}:any){return <div style={{padding:"24px 28px 0",fontSize:"10px",letterSpacing:"3px",color:"#1b2a4a",textTransform:"uppercase",fontFamily:"'Courier New',monospace",fontWeight:"bold"}}>{children}</div>}
function Mid({gap,center,children}:any){return <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"20px 28px",gap:gap||"16px",...(center?{alignItems:"center"}:{})}}>{children}</div>}
function Row2({children}:any){return <div style={{flex:1,display:"flex"}}>{children}</div>}
function Half({br,children}:any){return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px",...(br?{borderRight:"1px solid #e2e8f0"}:{})}}>{children}</div>}
function Big({e}:any){return <div style={{fontSize:"48px",marginBottom:"12px"}}>{e}</div>}
function Num({c,children}:any){return <div style={{color:c,fontSize:"36px",fontWeight:"bold",fontFamily:"'Georgia',serif"}}>{children}</div>}
function Sub({children}:any){return <div style={{color:"#64748b",fontSize:"13px",marginTop:"8px",textAlign:"center",lineHeight:1.6}}>{children}</div>}
function BoldT({children}:any){return <div style={{fontSize:"14px",color:"#1b2a4a",fontWeight:"bold",marginBottom:"4px"}}>{children}</div>}
function Punch({g,children}:any){return <div style={{padding:"0 28px 24px",textAlign:"center",color:g?"#0d9488":"#1b2a4a",fontSize:"16px",fontFamily:"'Georgia',serif",fontStyle:"italic",lineHeight:1.5,fontWeight:"600"}}>{children}</div>}
function Yr({children}:any){return <div style={{fontSize:"11px",color:"#64748b",letterSpacing:"2px",marginBottom:"8px"}}>{children}</div>}
function IconRow({e,t,s,c}:any){return <div style={{display:"flex",alignItems:"center",gap:"20px",width:"100%"}}><div style={{fontSize:"44px"}}>{e}</div><div><div style={{color:c,fontSize:"24px",fontFamily:"'Georgia',serif",fontWeight:"bold"}}>{t}</div><div style={{color:"#64748b",fontSize:"12px",marginTop:"2px"}}>{s}</div></div></div>}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ═══════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════

// Curated meme IDs in display order per section
const curatedOrder: string[] = [
  // Fiat Is Failing
  "fiat-graveyard", "what-things-cost", "printer-go-brr", "king-vs-fed", "mom-gdp", "grandma-vs-you",
  // Why Bitcoin Can't Fix It
  "90pct-scams", "btc-exits", "btc-pizza-math", "drake-btc", "wallet-ux", "stablecoin-trap",
  // How the Alignment Economy Works
  "join-anytime", "stay-at-home", "bread-stable", "vouch-system",
];

const curatedSet = new Set(curatedOrder);
const memeMap = new Map(memes.map(m => [m.id, m]));

export const curatedMemes = curatedOrder
  .filter(id => memeMap.has(id))
  .map(id => memeMap.get(id)!);

export { memes };
