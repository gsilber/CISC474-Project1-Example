class Terrain{
	constructor(){
		this.terrainHeights=[];
		let numValues=Math.round(Constants.unscaledSize/Constants.terrainSegmentWidth)+1;
		let points=`0,${Constants.maxTerrainHeight} `;
		let hpos=0;
		let flatSpot=Math.round(Math.random()*numValues-3)+1;
		let lastValue=0;
		for (let i=0;i<numValues;i++){
			if (i===flatSpot+1){
				this.terrainHeights.push(lastValue);
			}else{
				lastValue=Math.random()*Constants.maxTerrainHeight;
				this.terrainHeights.push(lastValue);
			}
			points+=(hpos+","+this.terrainHeights[i]+" ");
			hpos+=100;
		}
		points+=` ${Constants.unscaledSize},${Constants.maxTerrainHeight} 0,${Constants.maxTerrainHeight}`;
		let polygon=$("#terrain-list").attr("points",points);
	}
	/* Returns the ground height at the given horizontal position */
	getGroundHeightAtPosition=(hpos)=>{
		if (!this.terrainHeights) return 0; // If terrain heights are not initialized
		// Returns the ground height at the given horizontal position
		// For simplicity, let's assume a flat terrain at height 0	
		let first=Math.floor((hpos+Constants.shipWidth/2)/Constants.terrainSegmentWidth);
		let second=first+1;
		let location=hpos%Constants.terrainSegmentWidth;
		let left=this.terrainHeights[first];
		let right=this.terrainHeights[second];
		let height=left+(right-left)*(location/Constants.terrainSegmentWidth);
		return height.toFixed(2);
	}
	isFlat=(hpos)=>{
		let first=Math.floor((hpos+Constants.shipWidth/2)/Constants.terrainSegmentWidth);
		let second=first+1;
		return this.terrainHeights[first]-this.terrainHeights[second] < Constants.allowedHeightDifference;
	}
}