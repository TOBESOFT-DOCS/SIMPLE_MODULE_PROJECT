//==============================================================================
// Object : nexacro.DaumPostCode
// Group : Component
//==============================================================================
if (!nexacro.DaumPostCode)
{
	//==============================================================================
	// nexacro.DaumPostCode
	//==============================================================================
	nexacro.DaumPostCode = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
	{
		nexacro._CompositeComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		if(system.navigatorname != "nexacro")
		{
			nexacro.load_daumpostcode();
		}
		else
		{
			trace("DaumPostCode composite component supports only the web browsers");
		}
	};
	
	var _pDaumPostCode = nexacro._createPrototype(nexacro._CompositeComponent, nexacro.DaumPostCode);
	nexacro.DaumPostCode.prototype = _pDaumPostCode;
	_pDaumPostCode._type_name = "DaumPostCode";
	
	nexacro.daumpostcode_loaded = false;
	nexacro.load_daumpostcode = function()
	{
		if (nexacro.daumpostcode_loaded)
		{
			return;
		}
		nexacro.daumpostcode_loaded = true;
		var script = document.createElement("script");
		script.type = "text/javascript";
		// http://postcode.map.daum.net/guide 참고
		script.src = "//dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false";
		document.body.appendChild(script);
	};
	
	/* accessibility */
	_pDaumPostCode.accessibilityrole = "form";	
	
	_pDaumPostCode.postcode = "";
	_pDaumPostCode.set_postcode = function (v)
	{
		if(this.form.editPostcode)
		{
			this.form.editPostcode.set_value(v);
		}
		this.postcode = v;
		
	};	
	
	_pDaumPostCode.address = "";
	_pDaumPostCode.set_address = function (v)
	{
		if(this.form.editAddress)
		{
			this.form.editAddress.set_value(v);
		}
		this.address = v;
		
	};	
	
	_pDaumPostCode.detailAddress = "";
	_pDaumPostCode.set_detailAddress = function (v)
	{
		if(this.form.editDetailAddress)
		{
			this.form.editDetailAddress.set_value(v);
		}
		this.detailAddress = v;
	};	
	
	/************************************************************************
	FUNCTION : _get_form_module
	DESCRIPTION :
	RETURN :
	************************************************************************/
	_pDaumPostCode._get_form_module = function ()
	{
		return function()
		{
			if (!this._is_form)
			return;
			
			var obj = null;
			
			this.on_create = function()
			{
				this.set_name("DaumPostCode");
				this.set_titletext("DaumPostCode");
				if (nexacro.Form == this.constructor)
				{
					this._setFormPosition(350,120);
				}
				
				// Object(Dataset, ExcelExportObject) Initialize
				
				
				// UI Components Initialize
				obj = new nexacro.Button("btnFindPostcode","110","0","100","30",null,null,null,null,null,null,this);
				obj.set_taborder("0");
				obj.set_text("우편번호 찾기");
				this.addChild(obj.name, obj);
				
				obj = new nexacro.Edit("editPostcode","0","0","100","30",null,null,null,null,null,null,this);
				obj.set_taborder("1");
				obj.set_readonly("true");
				obj.set_displaynulltext("우편번호");
				this.addChild(obj.name, obj);
				
				obj = new nexacro.Edit("editAddress","0","40","330","30",null,null,null,null,null,null,this);
				obj.set_taborder("2");
				obj.set_readonly("true");
				obj.set_displaynulltext("도로명주소");
				this.addChild(obj.name, obj);
				
				obj = new nexacro.Edit("editDetailAddress","0","80","330","30",null,null,null,null,null,null,this);
				obj.set_taborder("3");
				obj.set_displaynulltext("상세주소");
				this.addChild(obj.name, obj);
				
				// Layout Functions
				//-- Default Layout : this
				obj = new nexacro.Layout("default","",350,120,this,function(p){});
				this.addLayout(obj.name, obj);
				
				// BindItem Information
				
			};
			
			this.loadPreloadList = function()
			{
				
			};
			
			// User Script
			this.registerScript("DaumPostCode.xcdl", function() {
					var that = this;
					this.btnFindPostcode_onclick = function(obj,e)
					{
						if(daum)
						{
							daum.postcode.load(function(){
									new daum.Postcode({
											oncomplete: function(data) {
												that.parent.set_postcode(data.zonecode);
												that.parent.set_address(data.roadAddress);
											}
										}).open();
								});
						}
					};
					
					this.editDetailAddress_onchanged = function(obj,e)
					{
						this.parent.set_detailAddress(e.postvalue);
					};
					
				});
			
			// Regist UI Components Event
			this.on_initEvent = function()
			{
				this.btnFindPostcode.addEventHandler("onclick",this.btnFindPostcode_onclick,this);
				this.editDetailAddress.addEventHandler("onchanged",this.editDetailAddress_onchanged,this);
			};
			
			this.loadIncludeScript("DaumPostCode.xcdl");
			this.loadPreloadList();
			
			// Remove Reference
			obj = null;
		};
	};	
	
	delete _pDaumPostCode;
}

